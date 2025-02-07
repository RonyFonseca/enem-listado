import { createContext } from "react";
import useProva from "../hooks/useProva";
const ContextProva = createContext()

function ProvaProvider ({children}){
    const {getAllProva, createProva} = useProva()
    return <ContextProva.Provider value={{getAllProva, createProva}}>{children}</ContextProva.Provider>
}

export {ContextProva, ProvaProvider}