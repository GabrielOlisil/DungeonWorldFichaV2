import { Link } from "react-router-dom"
import { Personagem } from "~/models/personagem.model"

export type CardProps = {
    props: Pick<Personagem, "personagemId" | "nome" | "imageUrl" | "pvTotal" | "pv" | "classe"> | undefined
}

const CardPersonagem = ({ props }: CardProps) => {

    return (

        <>
            <article className="card bg-base-100 w-96  shadow-xl">

                <figure>
                    {
                        props
                            ? <img
                                alt="Imagem do Personagem"
                                src={props.imageUrl}
                                className="h-56 w-full object-cover object-top" />
                            : <div className="skeleton h-56 w-full"></div>
                    }

                </figure>


                <div className="card-body">

                    <h2 className="card-title">
                        {
                            props
                                ? <>{props.nome}</>
                                : <div className="skeleton h-4 w-8/12"></div>
                        }
                    </h2>




                    {
                        props
                            ? <p>{props.classe}</p>
                            : <div className="skeleton h-4 w-4/12"></div>
                    }
                    {
                        props
                            ? <>
                                <p >Pv/Pv Total</p>
                                <progress className="progress progress-error " value={props.pv} max={props.pvTotal}></progress>
                            </>
                            : <>
                                <div className="skeleton h-3 w-2/12"></div>

                                <div className="skeleton h-3 "></div>
                            </>
                    }


                    <div className="card-actions justify-end">

                        {
                            props
                                ? <Link to={`/personagens/${props.personagemId}`}><button className="btn btn-primary">Visualizar</button></Link>
                                : <div className="skeleton h-10 w-24"></div>

                        }


                    </div>
                </div>
            </article>
        </>
    )
}

export default CardPersonagem;