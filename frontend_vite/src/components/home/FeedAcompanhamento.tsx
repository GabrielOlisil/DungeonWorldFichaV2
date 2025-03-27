
import { useContext } from "react"
import { PersonagensContext } from "~/pages/Home"
import CardPersonagem from "./CardPersonagem"


export default () => {

    let personagens = useContext(PersonagensContext)

    if (!personagens || personagens.length == 0) {
        return (
            <section className="flex flex-wrap gap-4 items-stretch pt-5 xl:w-300 m-auto justify-center  xl:justify-start"  >
                {Array(10).fill(0).map((_, index) => {
                    return (
                        <CardPersonagem props={undefined} key={index} />
                    )
                })}
            </section>

        )

    }
    return (
        <>
            <section className="flex flex-wrap gap-4 items-stretch pt-5 xl:w-300 m-auto justify-center  xl:justify-start"  >

                {personagens.map((personagem, index) => {
                    return (
                        <CardPersonagem props={personagem} key={index} />
                    )
                })}
            </section>
        </>
    )

}


// export default FeedAcompanhamento;