import { createContext, useEffect, useState } from "react"
import FeedAcompanhamento from "~/components/home/FeedAcompanhamento"
import { FetchPersonagemList, Personagem } from "~/models/personagem.model"

export const PersonagensContext = createContext<Personagem[] | undefined>(undefined)

export default function Home() {

    const [personagens, setPersonagens] = useState<Personagem[] | undefined>(undefined)

    const fetchPersonagem = async () => {
        let res = await fetch("http://localhost:8000/api/personagens");

        let json: FetchPersonagemList = await res.json()

        setPersonagens(json.data)
    }

    useEffect(() => {

        fetchPersonagem()
    }, [])

    return (
        <>
            <PersonagensContext.Provider value={personagens}>
                <FeedAcompanhamento />
            </PersonagensContext.Provider>
        </>

    )
}

