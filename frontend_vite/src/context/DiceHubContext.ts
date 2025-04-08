import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createContext } from "react";


const connection = new HubConnectionBuilder()
    .withUrl('http://localhost:8000/dadosHub', {
        transport: HttpTransportType.WebSockets
    })
    .build();

export const DadosHubContext = createContext<HubConnection>(connection)