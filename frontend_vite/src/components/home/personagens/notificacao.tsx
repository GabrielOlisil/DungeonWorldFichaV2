export type notificacaoProps = {
    props: notificacoes[]
}

export type notificacoes = {
    content: string
    type: string
}


export default function Notificacao({ props }: notificacaoProps) {



    return (
        <div className="toast toast-end">

            {props?.map((mensagem, index) => {
                return (
                    <div className={`alert alert-error`} key={index}>
                        <span className="text-error-content">{mensagem.content}</span>
                    </div>
                )
            })}

        </div>
    )
}