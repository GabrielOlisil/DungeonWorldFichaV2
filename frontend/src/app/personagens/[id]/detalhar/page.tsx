import {FetchPersonagem} from "@/models/personagem.model";


export default async function Detalhar({params}: {
    params: Promise<{ id: string }>
}) {

    const {id} = await params;

    const data = await fetch(`http://localhost:8080/api/personagens/${id}`)


    const {data: personagem}: FetchPersonagem = await data.json();

    if (personagem == null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-center text-3xl">Personagem não encontrado</h1>
            </div>
        );
    }

    return (


        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-base-200 p-6 rounded-xl shadow-xl">
                <h1 className="text-4xl font-semibold text-center text-primary">{personagem.nome}</h1>
                <div className="flex justify-center mt-6">
                    <img
                        src={personagem.imageUrl}
                        alt={personagem.nome}
                        className="rounded-lg w-48 h-48 object-cover object-top"
                    />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold">Informações do Personagem</h2>
                        <div className="mt-4">
                            <p><strong>Classe:</strong> {personagem.classe}</p>
                            <p><strong>Nível:</strong> {personagem.nivel}</p>
                            <p><strong>HP:</strong> {personagem.pv}/{personagem.pvTotal}</p>
                            <p><strong>Armadura:</strong> {personagem.armadura}</p>
                            <p><strong>Dado de Dano:</strong> {personagem.dadoDano}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Descrição</h2>
                        <div className="mt-4">
                            <p><strong>Descrição 1:</strong> {personagem.descricaoUm}</p>
                            <p><strong>Equipamento:</strong> {personagem.equipamento}</p>
                            <p><strong>Descrição 2:</strong> {personagem.descricaoDois}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Habilidade</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Força:</strong> {personagem.habilidade.forca}</p>
                            <p><strong>Destreza:</strong> {personagem.habilidade.destreza}</p>
                            <p><strong>Constituição:</strong> {personagem.habilidade.constituicao}</p>
                        </div>
                        <div>
                            <p><strong>Inteligência:</strong> {personagem.habilidade.inteligencia}</p>
                            <p><strong>Sabedoria:</strong> {personagem.habilidade.sabedoria}</p>
                            <p><strong>Carisma:</strong> {personagem.habilidade.carisma}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}