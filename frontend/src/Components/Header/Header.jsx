import "./Header.css"
import {Link} from "react-router-dom"
import {Context} from "../../Context/UseContext.jsx"
import {useContext} from "react"
function Header(){
    const {logout, logado} = useContext(Context)

    return(
        <div>
            {logado ? (<header>
                <h2>Logo</h2>
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