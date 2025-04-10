import { SendHorizontal } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import FeedAcompanhamento from "~/components/home/FeedAcompanhamento"
import TokenContext from "~/context/TokenProvider"
import { FetchPersonagemList, Personagem } from "~/models/personagem.model"


export default function Home() {

    const [personagens, setPersonagens] = useState<Personagem[] | undefined>(undefined)
    const token = useContext(TokenContext)

    const fetchPersonagem = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/personagens`, {
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

        <section className="relative">

            {personagens && <FeedAcompanhamento props={personagens} />}

            <div className="fixed bottom-10 w-full">
                <div className="m-auto max-w-100 flex justify-center">
                    <div className="join grow">
                        <div className="w-full">
                            <label className="input w-full validator join-item">
                                <input type="text " className="w-full" placeholder="Rolar Dado" required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <button className="join-item bg-neutral text-neutral-content p-2 cursor-pointer">
                            <SendHorizontal />
                        </button>
                    </div>
                </div>
            </div>


        </section>

    )
}

