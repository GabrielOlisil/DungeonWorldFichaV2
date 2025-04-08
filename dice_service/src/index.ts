import amqp from "amqplib/callback_api.js";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const RABBITMQ_URL = "amqp://user:password@rabbitmq";
const QUEUE_NAME = "pushRoll";
const QUEUE_OUTPUT_NAME = "RollResult";

type RollMessage = {
    Personagem: string,
    DicePrompt: string,
    Output: string | null,
    Modalidade: string
}

function startConsumer() {
    amqp.connect(RABBITMQ_URL, (err, conn) => {
        if (err) {
            console.error("❌ Erro ao conectar ao RabbitMQ:", err);
            process.exit(1);
        }

        conn.createChannel((err1, channel) => {
            if (err1) {
                console.error("❌ Erro ao criar canal:", err1);
                process.exit(1);
            }

            channel.assertQueue(QUEUE_NAME, { durable: true });
            channel.assertQueue(QUEUE_OUTPUT_NAME, { durable: true });

            console.log(`🟢 Aguardando mensagens em "${QUEUE_NAME}". Para sair: CTRL+C`);

            channel.consume(
                QUEUE_NAME,
                (msg) => {
                    if (!msg) return;

                    try {
                        const jsonString = msg.content.toString('utf8'); // decodifica o buffer
                        const content: RollMessage = JSON.parse(jsonString);
                        const roll = new DiceRoll(content.DicePrompt);
                        console.log(`📨 Mensagem recebida: ${roll.output}`);

                        content.Output = roll.output;

                        // Envia o resultado para a fila de saída
                        channel.sendToQueue(QUEUE_OUTPUT_NAME, Buffer.from(JSON.stringify(content)));

                        // Confirma o processamento da mensagem
                        channel.ack(msg);
                    } catch (err) {
                        console.error("❌ Erro ao processar mensagem:", err);

                        // Opcional: decide se reprocessa ou descarta
                        channel.nack(msg, false, false); // descarta a mensagem
                    }
                },
                { noAck: false }
            );
        });
    });
}

// Captura falhas globais para evitar que a app caia
process.on("uncaughtException", (err) => {
    console.error("🚨 Exceção não tratada:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("🚨 Promessa rejeitada sem tratamento:", reason);
});

// Inicia o consumidor
startConsumer();