import { createContext } from "react";


type NotificacoesContextType = {
    notificacoes: string[] | undefined;
    setNotificacoes: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

export const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined)
