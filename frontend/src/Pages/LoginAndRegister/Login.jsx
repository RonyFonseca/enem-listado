import "./Index.css"
import { useState,useContext } from "react"
import { Link } from "react-router-dom"
import {Context} from "../../Context/UseContext.jsx"
function Login(){

    const {login} = useContext(Context)
    const [user, setUser] = useState({})

    const send = (e) => {
        e.preventDefault()
        login(user)
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={send} className="container-login-register">
            <h1>Login</h1>
            <div className="inputs" class="mb-3">
                <div className="input-container">
                    <i class="bi bi-envelope-at-fill"></i>
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)} class="form-control"></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" placeholder="Senha" name="password" onChange={(e)=>handleChange(e)} class="form-control"></input>
                </div>
                <div className="informacao-add">
                    <p>Você não tem uma conta ?</p>
                    <Link to="/Register">Registrar</Link>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
    )
}

export default Login