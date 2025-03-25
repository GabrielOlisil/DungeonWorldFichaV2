import Image from "next/image";


import {Card, CardProps} from "@/components/card";
import FeedAcompanhamento from "@/components/feedAcompanhamento";
import {FetchPersonagemList} from "@/models/personagem.model";



export const dynamic = 'force-dynamic'

export default async function Home() {

  const data = await fetch('http://localhost:8080/api/personagens')
  const personagens: FetchPersonagemList = await data.json();

  if(!personagens.data){

    return (
        <div className="m-auto mt-20 text-center text-2xl">Nenhum personagem encontrado</div>
    );

  }

  return (

      <FeedAcompanhamento props={personagens.data} />
  );
}
