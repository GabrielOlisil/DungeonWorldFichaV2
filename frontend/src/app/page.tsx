import Image from "next/image";


import {Card, CardProps} from "@/Components/card";
import FeedAcompanhamento from "@/Components/feedAcompanhamento";
import {FetchPersonagemList} from "@/Models/Personagem";



export const dynamic = 'force-dynamic'

export default async function Home() {

  const data = await fetch('http://localhost:8080/api/personagens')
  const personagens: FetchPersonagemList = await data.json();


  return (

      <FeedAcompanhamento props={personagens.data} />
  );
}
