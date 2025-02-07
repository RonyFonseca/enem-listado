import {useEffect, useState} from "react"
import { useParams} from "react-router-dom"
import api from "../../Utils/api"

import useflashMessage from "../../hooks/flashMessage"
import "./Detalhes.css"

function Detalhes (){
    const {id} = useParams()
    const [prova, setProva] = useState({})
    const [email, setEmail] = useState("")
    const [emailPrimario, setEmailPrimario] = useState("")
    const [name, setName] = useState("")

    const UserId = localStorage.getItem("UserId")

    const {setFlashMessage} = useflashMessage()

    useEffect(()=> {
        const mostrarDetralhes = async() => {
            const response = await api.get(`/prova/detalhes/${id}`)
            setProva(response.data.prova)
            setName(response.data.prova.dono_da_prova.name)
            setEmail(response.data.prova.dono_da_prova.email)
            setEmailPrimario(response.data.prova.dono_da_prova.email)
        }
        mostrarDetralhes()
    },[id])

    const send = async(e) => {
        e.preventDefault()

        let msg
        let type 

        const provaAtualizada ={
            ...prova, 
            dono_da_prova: {
                ...prova.dono_da_prova,
                email:email,
                name:name
            }
        }

        setName(provaAtualizada.dono_da_prova.name)
        setEmail(provaAtualizada.dono_da_prova.email)

        if(email == emailPrimario){
            msg = "Este é seu Email atual"
            type = "atencion"
            setFlashMessage(msg, type)
            return
        }

        await api.patch(`/prova/edit/${id}`, {provaAtualizada}).then((response) =>{
            msg = response.data.message 
            type = "success"
        }).catch((err)=> {
            msg = err.response.data.message
            type="error"
        })

        setFlashMessage(msg, type)
    }

    return (
        <section >
            <div id="header-detalhes">
                <h1>{prova.titulo}</h1>
                <p>{prova.descricao}</p>
            </div>
            <div>
                <h2>Informaçôes da prova</h2>

                <div id="informacoes">
                    <div>
                        <h3>Criador:</h3>
                        <ul>
                            <li>{name || "carregando..."}</li>
                            <li>{email || "carregando..."}</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Prova:</h3>
                        <ul>
                            <li>Quantidade de questões:</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Seções:</h3>
                        <ul>
                            <li>Matemática</li>
                            <li>Português</li>
                            <li>Humanas</li>
                        </ul>
                    </div>
                </div>
            </div>
            {UserId == prova.dono_da_prova?.userId? 
            (<>
                <form onSubmit={send} id="informacoes-extras-detalhes">
                    <input type="email" value={email} name="email" class="form-control" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="text" value={name} name="name" class="form-control" onChange={(e) => setName(e.target.value)} />
                    <label>As informações que forem modificadas aqui não serão afetadas no seu login principal.</label>
                    <button type="submit" class="btn btn-primary" >Atualizar</button>
                </form>
            </>) 
            : 
            (<>
            </>)}
        </section>
    )
}

export default Detalhes