import {FetchPersonagemList} from "@/Models/Personagem";
import Link from "next/link";

export default async function PersonagemsList() {

    const data = await fetch('http://localhost:8080/api/personagens')
    const personagens: FetchPersonagemList = await data.json();


    return (


        <ul className="list bg-base-100 rounded-box shadow-md w-200 m-auto mt-20">

            <li className="p-4 pb-2 text-sm opacity-60 tracking-wide">Personagens</li>


            {personagens.data.map((person, index: number) => (

                <li className="list-row items-center">
                    <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                    <div><img alt="imagem do personagem" className="size-20 rounded-box object-cover object-top" src={person.imageUrl}/></div>
                    <div className="list-col-grow">
                        <div className="text-xl" >{person.nome}</div>
                        <div className="text-lg uppercase font-semibold opacity-60">{person.classe}</div>
                    </div>

                        <Link href={`/personagens/${person.personagemId}/detalhar`} className="btn btn-primary" >Detalhar</Link>

                </li>
            ))}


        </ul>
    )
}