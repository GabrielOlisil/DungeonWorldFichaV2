import {FetchPersonagemList} from "@/models/personagem.model";
import Link from "next/link";

export default async function PersonagemsList() {

    const data = await fetch('http://localhost:8080/api/personagens')
    const personagens: FetchPersonagemList = await data.json();

    if(!personagens.data){
        return (
            <div className="m-auto mt-20 text-center text-2xl">Nenhum personagem encontrado</div>
        );
    }


    return (


        <ul className="list bg-base-100 rounded-box shadow-md lg:w-200 m-auto mt-20">

            <li className="p-4 pb-2 text-sm opacity-60 tracking-wide">Personagens</li>


            {personagens.data.map((person, index: number) => (

                <li className="list-row items-center" key={index} >
                    <div className=" text-lg sm:text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                    <div className=""><img alt="imagem do personagem" className="size-20 rounded-box object-cover object-top hidden sm:block" src={person.imageUrl}/></div>
                    <div className="list-col-grow">
                        <div className="text-base sm:text-xl" >{person.nome}</div>
                        <div className="text-base  sm:text-lg uppercase font-semibold opacity-60">{person.classe}</div>
                    </div>

                        <Link href={`/personagens/${person.personagemId}/detalhar`} className="btn btn-primary text-xs sm:text-base" >Detalhar</Link>

                </li>
            ))}


        </ul>
    )
}