import "./Index.css"
import {useState, useContext } from "react"
import {Context} from "../../Context/UseContext.jsx"
function Register(){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const send =(e) => {
        e.preventDefault()
        register(user)
        
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
        console.log(user)
    }

    return(
        <div className="container-login-register">
            <h1>Registre-se</h1>
            <form onSubmit={send} className="inputs" class="mb-3">
                <div className="input-container">
                    <i class="bi bi-person-fill"></i>
                    <input type="text" name="name" placeholder="Nome" class="form-control" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-envelope-at-fill"></i>
                    <input type="email" name="email" placeholder="Email" class="form-control" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" name="password" placeholder="Senha" class="form-control" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-person-fill-lock"></i>
                    <input type="password" name="confirmPassword" placeholder="Confirmar Senha" class="form-control" onChange={(e) => handleChange(e)}></input>
                </div>

                <div className="informacao-add">
                    <p>Você ja tem uma conta ?</p>
                    <a href="/Login">Login</a>
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    )
}

export default Register