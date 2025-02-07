import api from "../Utils/api"
import setToken from "./setToken.js"
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import useflashMessage from "./flashMessage.js"


function useAuth(){
    const navigate = useNavigate()
    const [logado, setLogado] = useState(false)

    const {setFlashMessage} = useflashMessage()

    async function register(user) {
        let msg = "Usuário registrado com sucesso"
        let type = "success"
        try{
            const usuario = await api.post("/user/register", user).then((response) => {
                return response.data
            })
            await setToken("set",usuario)
            setLogado(true)
            navigate("/")
        }catch(err){
            msg = `${err.response.data.message}`
            type = "error"
        }
        setFlashMessage(msg, type)
    }

    async function userLogado(){
        if(localStorage.getItem("AltToken")){
            setLogado(true)
        }
    }

    async function login(user){
        let msg
        let type
        try{
            const usuario = await api.post("/user/login", user).then((response) => {
                return response.data
            })

            msg = `Seja bem-vindo novamente ${usuario.name}`
            type = "success"
            setToken("set",usuario)
            setLogado(true)
            navigate("/")
        }catch(err){
            msg = `${err.response.data.message}`
            type = "error"
            console.log(err)
        }
        setFlashMessage(msg, type)
    }

    function logout() {
        localStorage.removeItem("AltToken")
        localStorage.removeItem("UserId")
        setLogado(false)
        navigate("/Login")
        let msg = "Usuário deslogado"
        let type = "atencion"
        setFlashMessage(msg, type)
    }

    return {register, login, logout, logado, userLogado}
}

export default useAuth