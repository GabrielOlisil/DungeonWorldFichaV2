import { createContext } from "react";

const TokenContext = createContext<string | undefined>(undefined)

export default TokenContext;