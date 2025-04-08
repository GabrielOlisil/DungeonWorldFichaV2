import { useContext, useEffect, useState } from "react"
import CardPersonagem from "./CardPersonagem"
import { Personagem } from "~/models/personagem.model"
import { PersonagemHubContext } from "~/context/personagemHub"


const FeedAcompanhamento = ({ props }: { props: Personagem[] }) => {

    const [personagens, setPersonagens] = useState(props)
    //const personagens = props
    const hubConn = useContext(PersonagemHubContext);

    useEffect(() => {
        if (!hubConn) return;

        const connect = async () => {
            if (hubConn.state === "Connected" || hubConn.state === "Connecting" || hubConn.state === "Reconnecting") {
                return;
            }
            try {
                await hubConn.start();

                await hubConn.invoke("JoinGroupGeral");
            } catch (err) {
                console.error("Erro ao conectar ao hub:", err);
            }
        }
        connect();

        const messageHandler = (message: Personagem) => {
            setPersonagens(prevPersonagens =>
                prevPersonagens.map(person =>
                    person.personagemId === message.personagemId ? message : person
                )
            );
        };

        hubConn.on("messageReceived", messageHandler);

        return () => {
            if (hubConn.state === "Connected") {
                hubConn.stop();
            }
            hubConn.off("messageReceived", message => console.log(message));
        };

    }, [])

    if (!personagens || personagens.length == 0) {
        return (
            <section className="flex flex-wrap gap-4 items-stretch pt-5 xl:w-300 mx-auto justify-center  xl:justify-start "  >
                {Array(10).fill(0).map((_, index) => {
                    return (
                        <CardPersonagem props={undefined} key={index} />
                    )
                })}
            </section>

        )

    }
    return (
        <>
            <section className="flex flex-wrap gap-4 items-stretch pt-5 xl:w-300 mx-auto justify-center  xl:justify-start "  >

                {personagens.map((personagem, index) => {
                    return (
                        <CardPersonagem props={personagem} key={index} />
                    )
                })}
            </section>
        </>
    )

}


export default FeedAcompanhamento;