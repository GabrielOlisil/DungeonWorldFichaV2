import { CircleX } from "lucide-react"
import { useContext } from "react"
import { NotificacoesContext } from "~/context/NotificationContext"



export const NotificationExplorer = () => {
    const notificacoes = useContext(NotificacoesContext)

    const removeNotify = (indexToRemove: number) => {
        notificacoes?.setNotificacoes(prev => {
            if (!prev) return prev;
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    return (
        <>
            <aside className="toast">
                {notificacoes?.notificacoes?.map((n, index) => {
                    return (
                        <div key={index} className="alert alert-error flex alert-soft">
                            <div>

                                <div className="font-bold">{n.title}</div>
                                <div className="divider"></div>
                                <div className="text-lg">{n.content}</div>
                            </div>
                            <CircleX className="self-start" onClick={() => removeNotify(index)} />
                        </div>
                    )
                })}
            </aside>
        </>
    )
}