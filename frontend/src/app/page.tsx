import Image from "next/image";


import {Card, CardProps} from "@/Components/Card";

interface Habilidade {
  id: number;
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
}

// Interface para Personagem
interface Personagem {
  personagemId: number;
  imageUrl: string;
  nome: string;
  pv: number;
  pvTotal: number;
  armadura: number;
  dadoDano: number;
  nivel: number;
  classe: string;
  descricaoUm: string;
  equipamento: string;
  descricaoDois: string;
  habilidade: Habilidade;
}

interface FetchPersonagem{
  status: boolean;
  message: string;
  data: Personagem[];
}

export const dynamic = 'force-dynamic'

export default async function Home() {

  const data = await fetch('http://localhost:5247/api/personagens')
  const personagens: FetchPersonagem = await data.json();




  return (

      <section className="container flex flex-wrap gap-4 justify-center items-stretch pt-5" >

        {personagens.data.map(personagem => {
          const cardProps: CardProps = {
            pvAtual: personagem.pv,
            pvTotal: personagem.pvTotal,
            nome: personagem.nome,
            classe: personagem.classe,
            imageUrl: personagem.imageUrl,
          }

          return <Card key={personagem.personagemId} {...cardProps} />
        })}



      </section>
  );
}
