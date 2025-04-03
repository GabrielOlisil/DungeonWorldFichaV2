import { FetchPersonagemList, Personagem } from "~/models/personagem.model";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TokenContext from "~/context/TokenProvider";

export default function PersonagensList() {

    const [personagens, setPersonagem] = useState<Personagem[] | undefined>(undefined)
    const token = useContext(TokenContext)

    const fetchData = async () => {
        const data = await fetch('http://localhost:8000/api/personagens', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const personagens: FetchPersonagemList = await data.json();
        setPersonagem(personagens.data);
    }

    useEffect(() => {
        console.log("chegou aqui")
        fetchData()
    }, []);



    if (!personagens) {
        return (
            <div className="m-auto mt-20 text-center text-2xl">Nenhum personagem encontrado</div>
        );
    }


    return (


        <ul className="list bg-base-100 rounded-box shadow-md lg:w-200 m-auto mt-20 mb-3">

            <li className="p-4 pb-2 text-sm opacity-60 tracking-wide">Personagens</li>


            {personagens.map((person, index: number) => (

                <li className="list-row items-center" key={index} >
                    <div className=" text-lg sm:text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                    <div className=""><img alt="imagem do personagem" className="size-20 rounded-box object-cover object-top hidden sm:block" src={person.imageUrl} /></div>
                    <div className="list-col-grow">
                        <div className="text-base sm:text-xl" >{person.nome}</div>
                        <div className="text-base  sm:text-lg uppercase font-semibold opacity-60">{person.classe}</div>
                    </div>

                    <Link to={`/personagens/${person.personagemId}`} className="btn btn-primary text-xs sm:text-base" >Detalhar</Link>

                </li>
            ))}


        </ul>
    )
}