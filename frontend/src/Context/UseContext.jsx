import {createContext} from "react"
import useAuth from "../hooks/useAuth"
const Context = createContext()

function UserProvider({children}){
    const {register, login, logout, logado, userLogado} = useAuth()
    return <Context.Provider value={{register, login, logout, logado, userLogado}}>{children}</Context.Provider>
}

export {Context, UserProvider}
