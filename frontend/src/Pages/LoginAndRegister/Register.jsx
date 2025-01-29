import "./Index.css"
import { useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Register(){
    const InputName = useRef("")
    const InputEmail = useRef("")
    const InputPassword = useRef("")
    const InputConfirmPassword = useRef("")

    const navigate = useNavigate()

    const send = async() => {
        if(InputPassword.current.value !== InputConfirmPassword.current.value){
            console.log("As senhas não sõa iguais")
            return
        }

        try{
            const user = await axios.post("http://localhost:4000/user/register",{name:InputName.current.value,email:InputEmail.current.value, password:InputPassword.current.value, confirmPassword:InputConfirmPassword.current.value})
            const token = user.data.token
            if(token){
                localStorage.setItem("AltToken", token)
                navigate("/Home")
            }
        }catch(err){
            console.log(err.message)
        }

    }
    return(
        <div className="container-login-register">
            <h1>Registre-se</h1>
            <div className="inputs" class="mb-3">
                <div className="input-container">
                    <i class="bi bi-person-fill"></i>
                    <input type="text" placeholder="Nome" ref={InputName} class="form-control"></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-envelope-at-fill"></i>
                    <input type="email" placeholder="Email" ref={InputEmail} class="form-control"></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" placeholder="Senha" ref={InputPassword} class="form-control"></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" placeholder="Confirmar Senha" ref={InputConfirmPassword} class="form-control"></input>
                </div>

                <div className="informacao-add">
                    <p>Você ja tem uma conta ?</p>
                    <a href="/Login">Login</a>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => send()}>Registrar</button>
        </div>
    )
}

export default Register