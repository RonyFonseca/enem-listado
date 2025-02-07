import api from "../Utils/api"
import {useState} from "react"
import useFlashMessages from "./flashMessage"
import {useNavigate} from "react-router-dom"

function useProva() {
    const {setFlashMessage} = useFlashMessages()

    const navigate = useNavigate()
    async function createProva(prova){
        let msg = "Prova criada com sucesso"
        let type = "success"

        if(prova.titulo== ''){
            msg = "Você não colocou o titulo"
            type = "error"
            setFlashMessage(msg, type)
            return 

        }else if(prova.desricao== ''){
            msg = "Você não colocou a descrição"
            type = "error"
            setFlashMessage(msg, type)
            return 
        }else if (prova.data.length==0){
            msg = "Você não pode adicionar uma prova sem questão"
            type = "error"
            setFlashMessage(msg, type)
            return
        }

        const token = localStorage.getItem("AltToken")

        try{
            await api.post("/prova/create", prova, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            navigate("/")
            setFlashMessage(msg, type)
            return true
        }catch(err){
            console.log(err.message)
        }

        setFlashMessage(msg, type)
    }

    async function getAllProva() {
        const provas = await api.get("/prova/")
        return provas.data
    }

    return {getAllProva, createProva}
}

export default useProva