import { useEffect, useState } from "react"
import FeedAcompanhamento from "~/components/home/FeedAcompanhamento"
import { FetchPersonagemList, Personagem } from "~/models/personagem.model"


export default function Home() {

    const [personagens, setPersonagens] = useState<Personagem[] | undefined>(undefined)

    const fetchPersonagem = async () => {
        const res = await fetch("http://localhost:8000/api/personagens");

        const json: FetchPersonagemList = await res.json()

        setPersonagens(json.data)
    }

    useEffect(() => {

        fetchPersonagem()
    }, [])

    return (

        <section>

            <FeedAcompanhamento props={personagens} />
        </section>

    )
}

