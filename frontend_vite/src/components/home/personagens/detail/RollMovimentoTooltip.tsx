import { useContext } from "react";
import { Habilidade } from "~/models/personagem.model";

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

    return (
        <>
            <div className="flex items-center gap-2 ">
                <div className="mask mask-hexagon w-12 cursor-pointer shrink-0 h-12 bg-success flex items-center justify-center">
                    <pre className="text-success-content "><code>2d6</code></pre>
                </div>
                <div className="tooltip tooltip-accent tooltip-right self-center">
                    {props?.descricao &&
                        <div className="tooltip-content p-3">
                            <div className="">{props.descricao}</div>
                        </div>
                    }
                    <div className="">

                        {
                            props?.movimento
                                ? <p className="self-center">{props.movimento}</p>
                                : <div className="skeleton w-40 h-5 self-center"></div>
                        }
                    </div>
                </div>




                <select defaultValue={props?.atributo} className="select select-ghost self-center max-w-fit cursor-pointer">
                    {Object.entries(listProperties).map(([atributo, sigla]) => (
                        <option key={atributo} value={atributo}>
                            {sigla.toUpperCase()}
                        </option>
                    ))}
                </select>

                {personagem && <><div className="badge badge-primary">{personagem.habilidade[props?.atributo as keyof Habilidade]}</div></>}
            </div>
        </>
    );
}