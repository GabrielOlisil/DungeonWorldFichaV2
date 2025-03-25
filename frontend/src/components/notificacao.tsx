"use-client"
export type notificacaoProps = {
    props: notificacoes[]
}

export type notificacoes ={
    content: string
    type: string
}


export default function Notificacao({props}: notificacaoProps) {


    console.log(props)

    return (
        <div className="toast toast-end">

            {props?.map((mensagem, index) => {
                return (
                    <div className={`alert alert-${mensagem.type}`} key={index}>
                    <span>{mensagem.content}</span>
                    </div>
                )
            })}
           
        </div>
    )
}