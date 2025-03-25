import {Card, CardProps} from "@/components/card";
import {Personagem} from "@/models/personagem.model";


type  FeedAcompanhamentoProps = {
    props: Personagem[];
}
export default function FeedAcompanhamento({props}: FeedAcompanhamentoProps) {
    return (
        <section className="flex flex-wrap gap-4 justify-center items-stretch pt-5" >

            {props.map(personagem => {
                const cardProps: CardProps = {
                    personagemId: personagem.personagemId,
                    pvAtual: personagem.pv,
                    pvTotal: personagem.pvTotal,
                    nome: personagem.nome,
                    classe: personagem.classe,
                    imageUrl: personagem.imageUrl,
                }

                return <Card key={personagem.personagemId} {...cardProps} />
            })}
        </section>
    )
}