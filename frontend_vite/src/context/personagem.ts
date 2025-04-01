import { createContext } from "react";
import { Personagem } from "~/models/personagem.model";

export const PersonagemContext = createContext<Personagem | undefined>(undefined)
