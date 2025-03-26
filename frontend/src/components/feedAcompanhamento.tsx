import { Card, CardProps } from "@/components/card";
import { Personagem } from "@/models/personagem.model";
import { createContext } from "react";



type FeedAcompanhamentoProps = {
    props: Personagem[] | null;
}
export default function FeedAcompanhamento({ props }: FeedAcompanhamentoProps) {



    return (
        <section className="flex flex-wrap gap-4 items-stretch pt-5 xl:w-300 m-auto justify-center  xl:justify-start"  >

            {!props && Array(10).fill(0).map((_, index) => {
                return <Card key={index} props={null} />;
            })}

            {props && props.map(personagem => {
                const cardProps: CardProps = {
                    personagemId: personagem.personagemId,
                    pvAtual: personagem.pv,
                    pvTotal: personagem.pvTotal,
                    nome: personagem.nome,
                    classe: personagem.classe,
                    imageUrl: personagem.imageUrl,
                }

                return <Card key={personagem.personagemId} props={cardProps} />
            })}
        </section>
    )
}