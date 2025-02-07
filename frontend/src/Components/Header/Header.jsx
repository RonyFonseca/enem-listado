import "./Header.css"
import { useEffect } from "react"
import {Link} from "react-router-dom"
import {Context} from "../../Context/UseContext.jsx"
import {useContext} from "react"
import Logo from "/images/Logo-escrita.png"
function Header(){
    const {logout, logado, userLogado} = useContext(Context)

    useEffect(()=>{
        userLogado()
    })

    return(
        <div>
            {logado ? (<header>
                <Link to="/" id="logo"><img src={Logo} alt="logo"/></Link>
                <nav>
                    <ul>
                        <li><Link to="/Create" class="btn btn-success">Cria Prova</Link></li>
                        <li><a onClick={logout} class="btn btn-dark">Logout</a></li>
                    </ul>
                </nav>
            </header>) : (<></>)}
        </div>
    )
}

export default Header