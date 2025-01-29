import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import { format } from 'date-fns'
import Header from "../../Components/Header/Header.jsx"
import "./Home.css"
function Home(){

    const [provas, setProvas] = useState([])

    useEffect(() => {
        const provas = async() => {
            const dataProvas = await axios.get("http://localhost:4000/prova/")

            const provasArr = dataProvas.data.provas
            setProvas(provasArr)
            // const data = new Date("2025-01-23T22:38:02.170Z");
            // console.log(format(data, 'dd/MM/yyyy HH:mm:ss'));
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

    return(
        <div>
            <Header namePage="Home" link1="/Create" nome1="Criar prova" link2="" nome2="Minhas Provas"/>
            {provas.map((e, index)=>(
                <div className="card-prova" key={e._id}>
                    <p className="data-lancado"><i class="bi bi-calendar2-check-fill"></i> Dia do post: {dataAtualizacao(e.createdAt)}</p>
                    <h2 className="card-titulo-prova">[{index + 1}]-{e.titulo}</h2>
                    <div className="card-links-prova">
                        <Link to="/Listar" className="card-link-listar" class="btn btn-primary"><i class="bi bi-clipboard-check-fill"></i> Listar</Link>
                        <a href="" className="card-link-destalhe" class="btn btn-warning"><i class="bi bi-eye-fill"></i> Detalhes</a>
                    </div>
                    <div className="botton-card">
                        <p className="data-ultilizacao"><i class="bi bi-cloud-arrow-up-fill"></i> Última atualização: {dataNova(e.updatedAt)}</p>
                        <p className="user-card-bottom"><i class="bi bi-person-fill"></i> @{e.dono_da_prova.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home