import { useContext, useEffect, useState } from "react"
import FeedAcompanhamento from "~/components/home/FeedAcompanhamento"
import TokenContext from "~/context/TokenProvider"
import { FetchPersonagemList, Personagem } from "~/models/personagem.model"


export default function Home() {

    const [personagens, setPersonagens] = useState<Personagem[] | undefined>(undefined)
    const token = useContext(TokenContext)

    const fetchPersonagem = async () => {
        const res = await fetch("http://localhost:8000/api/personagens", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const json: FetchPersonagemList = await res.json()

        setPersonagens(json.data)
    }

    useEffect(() => {

        fetchPersonagem()
    }, [])

    return (

        <section>



            {personagens && <FeedAcompanhamento props={personagens} />}
        </section>

    )
}

