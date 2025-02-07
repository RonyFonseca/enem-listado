import { useEffect, useState, useContext } from "react"
import {Link} from "react-router-dom"
import { format } from 'date-fns'
import {Context} from "../../Context/UseContext.jsx"
import {ContextProva} from "../../Context/ProvaContext.jsx"
import api from "../../Utils/api.js"

import "./Home.css"
function Home(){

    const [provas, setProvas] = useState([])
    const [strProcura, setStrProcura] = useState("")

    const {getAllProva} = useContext(ContextProva)

    useEffect(() => {
        const provas = async() => {
            // const data = await getAllProva()
            const data = await api.get("/prova/")
            setProvas(data.data.provas)
        }
        provas()
    },[])

    function dataNova (x){
        const data = new Date(x)
        return (<spam>{format(data,'dd/MM/yyyy')}</spam>)
    }

    function dataAtualizacao (x){
        const data = new Date(x)
        return (<spam>{format(data,'dd/MM/yyyy')}</spam>)
    }

    async function handleChange(e){
        const data = await api.get("/prova/", {params:{titulo:e.target.value}})
        if(data.data.provas.length==0){
            setProvas([])
        }
        setProvas(data.data.provas)
    }

    async function addopc(e){
        const data = await api.get("/prova/", {params:{titulo:e.target.name}})
        if(data.data.provas.length==0){
            setProvas([])
        }
        setProvas(data.data.provas)
    }

    

    return(
        <div id="home-provas">
            <div>
                <div id="menu-home-busca">
                    <div id="busca">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Procurar" class="form-control" onChange={handleChange}/>
                        <button type="button" class="btn btn-success"><i class="bi bi-search"></i></button> 
                    </div>
                </div>
                <label className="label-aviso">Procure pelas provas de maneira mais rápida, digite algumas palavras chaves Ex:"Enem" ou clique nos atalhos logo a baixo.</label>
                <div id="helpers">
                    <button onClick={addopc} name="Enem">Enem</button>
                    <button onClick={addopc} name="2020">2020</button>
                    <button onClick={addopc} name="Prova">Prova</button>
                </div>
            </div>
            <div id="home-prova-loop">
                <div className="jumpscare">{provas.length == 0 ? (<span>Não achei nada</span>):(<></>)}</div>
                {provas.map((e, index)=>(
                    <div className="card-prova" key={e._id}>
                        <h3 className="card-titulo-prova">{e.titulo}</h3>
                        <div>
                            <p className="data-lancado"><i class="bi bi-calendar2-check-fill"></i> Dia do post: {dataAtualizacao(e.createdAt)}</p>
                            <div className="card-links-prova">
                                <Link to={`/Listar/${e._id}`} className="card-link-listar" class="btn btn-primary"><i class="bi bi-clipboard-check-fill"></i> Listar</Link>
                                <Link to={`/Detalhes/${e._id}`} className="card-link-destalhe" class="btn btn-warning"><i class="bi bi-eye-fill"></i> Detalhes</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home