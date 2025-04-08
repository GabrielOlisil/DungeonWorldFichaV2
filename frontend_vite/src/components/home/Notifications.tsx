import { CircleX, X } from "lucide-react"
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
                        <div className="alert alert-info">
                            <span key={index}>{n}</span>
                            <CircleX onClick={() => removeNotify(index)} />
                        </div>
                    )
                })}
            </aside>
        </>
    )
}