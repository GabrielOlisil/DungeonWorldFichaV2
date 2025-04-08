import { createContext } from "react";

export type NotificacoesType = {
    title: string, content: string
}

type NotificacoesContextType = {
    notificacoes: NotificacoesType[] | undefined;
    setNotificacoes: React.Dispatch<React.SetStateAction<NotificacoesType[] | undefined>>;
};

export const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined)
