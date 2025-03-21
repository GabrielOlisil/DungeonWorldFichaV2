import Link from "next/link";

{/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/
}

export interface CardProps {
    personagemId: number;
    nome: string;
    imageUrl: string;
    pvTotal: number;
    pvAtual: number;
    classe: string;
}

export function Card(props: CardProps) {
    return (

        <article className="card bg-base-100 w-96 shadow-xl ">

            <figure>
                <img
                    alt="Imagem do Personagem"
                    src={props.imageUrl}
                    className="h-56 w-full object-cover object-top"
                />
            </figure>


            <div className="card-body">

                <h2 className="card-title">{props.nome}</h2>



                <p>
                    {props.classe}
                </p>
                <p>
                    {props.pvAtual} / {props.pvTotal}
                </p>


                <div className="card-actions justify-end">
                    <Link href={`/personagens/${props.personagemId}/detalhar/`}><button className="btn btn-primary">Visualizar</button></Link>
                </div>
            </div>
        </article>
    )
}
