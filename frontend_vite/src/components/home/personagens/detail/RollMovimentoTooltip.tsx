import { useContext, useEffect, useState } from "react";
import { getAtributeModifier, Habilidade } from "~/models/personagem.model";



export type RollMovimentoTooltipProps = {
    movimento: string
    descricao: string
    atributo: keyof Omit<Habilidade, "id">
}

type SelectInfo = "car" | "for" | "con" | "des" | "sab" | "int";

const listProperties: Record<keyof Omit<Habilidade, "id">, SelectInfo> = {
    carisma: "car",
    constituicao: "con",
    destreza: "des",
    forca: "for",
    inteligencia: "int",
    sabedoria: "sab"
}


import { PersonagemContext } from "~/context/personagem";

export default function RollMovimentoTooltip({ props }: { props: RollMovimentoTooltipProps | undefined }) {



    const personagem = useContext(PersonagemContext)

    const [atribute, setAtribute] = useState<string | undefined>(props?.atributo)

    const [modifier, setModifier] = useState<string>()

    const RollDice = () => {

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dados`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: personagem?.personagemId,
                atributo: atribute
            })
        });
    }

    useEffect(() => {
        setModifier(getAtributeModifier(personagem!.habilidade[atribute as keyof Habilidade]))

    }, [atribute, personagem])

    return (
        <>
            <div onClick={RollDice} className="mask mask-hexagon w-12 cursor-pointer shrink-0 h-12 bg-success flex items-center justify-center justify-self-center">
                <pre className="text-success-content "><code>2d6</code></pre>
            </div>

            <div className="col-span-2">

                {
                    props?.movimento
                        ? <p className="self-center ">{props.movimento}</p>
                        : <div className="skeleton w-40 h-5 self-center"></div>
                }
            </div>




            <select defaultValue={atribute} onChange={(e) => { setAtribute(e.target.value) }} className="select select-ghost self-center   max-w-fit cursor-pointer">
                {Object.entries(listProperties).map(([atributo, sigla]) => (
                    <option key={atributo} value={atributo}>
                        {sigla.toUpperCase()}
                    </option>
                ))}
            </select>

            {personagem && <><div className="badge badge-primary font-mono ">{modifier}</div></>}
        </>
    );
}