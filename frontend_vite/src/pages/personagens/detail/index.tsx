import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FetchPersonagem, Personagem } from "~/models/personagem.model";
import BarraHabilidades from "../../../components/home/personagens/detail/BarraHabilidades";



export default function DetailPersonagem() {
    const { id } = useParams()

    const [personagem, setPersonagem] = useState<Personagem | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPersonagem = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/personagens/${id}`);
            const result: FetchPersonagem = await response.json();

            if (result.data === null) {
                setError('Personagem não encontrado');
            } else {
                setPersonagem(result.data);
            }
        } catch (err) {
            setError('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPersonagem();
    }, []); // Reexecuta o efeito quando os parâmetros mudam

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-center text-3xl">Carregando...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-center text-3xl">{error}</h1>
            </div>
        );
    }

    return (
        <BarraHabilidades props={personagem} />
    )

}
