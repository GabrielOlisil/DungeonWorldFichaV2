"use-client"

import Link from "next/link";

{/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/
}

interface Props {
    props: CardProps | null
}

export interface CardProps {
    personagemId: number;
    nome: string;
    imageUrl: string;
    pvTotal: number;
    pvAtual: number;
    classe: string;
}

export function Card({ props }: Props) {

    if (!props) {
        return (
            <article className="card bg-base-100 w-96  shadow-xl">

                <div className="skeleton h-56 w-full"></div>



                <div className="card-body">

                    <h2 className="card-title">
                        <div className="skeleton h-4 w-8/12"></div>

                    </h2>



                        <div className="skeleton h-4 w-4/12"></div>
                  
                        <div className="skeleton h-4 w-2/12"></div>
                    


                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Visualizar</button>
                    </div>
                </div>
            </article>
        )
    }

    return (

        <article className="card bg-base-100 w-96  shadow-xl">

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
