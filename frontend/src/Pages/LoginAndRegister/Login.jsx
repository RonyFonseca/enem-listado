import "./Index.css"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Login(){
    const InputEmail = useRef("")
    const InputPassword = useRef("")

    const navigate = useNavigate()

    const send = async() => {
        try{
            const user = await axios.post("http://localhost:4000/user/login", {email:InputEmail.current.value, password:InputPassword.current.value})
            const token = user.data.token
            if(token){
                localStorage.setItem("AltToken", token)
                navigate("/")
            }
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <div className="container-login-register">
            <h1>Login</h1>
            <div className="inputs" class="mb-3">
                <div className="input-container">
                    <i class="bi bi-envelope-at-fill"></i>
                    <input type="email" placeholder="Email" ref={InputEmail} class="form-control"></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" placeholder="Senha" ref={InputPassword} class="form-control"></input>
                </div>
                <div className="informacao-add">
                    <p>Você não tem uma conta ?</p>
                    <a href="/">Registrar</a>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => send()}>Entrar</button>
        </div>
    )
}

export default Login