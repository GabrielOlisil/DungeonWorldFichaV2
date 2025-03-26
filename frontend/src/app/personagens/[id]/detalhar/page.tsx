"use client"
import BarraHabilidades from "@/components/personagens/barraHabilidades";
import { FetchPersonagem, Personagem } from "@/models/personagem.model";
import { createContext, useEffect, useState } from "react";

export const PersonagemContext = createContext<Personagem | null>(null);


export default function Detalhar({ params }: { params: Promise<{ id: string }> }) {
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonagem = async () => {
      try {
        const { id } = await params; // Pegando o ID dos parâmetros
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

    fetchPersonagem();
  }, [params]); // Reexecuta o efeito quando os parâmetros mudam

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
    <PersonagemContext.Provider value={personagem}>
      <BarraHabilidades />
    </PersonagemContext.Provider>
  )


}
