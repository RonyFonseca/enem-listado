import Header from "../../Components/Header/Header.jsx"
import axios from "axios"
import { useEffect,useState } from "react"
import "./Listar.css"
function Listar () {

    const [provas, setProvas] = useState([])

    useEffect(() => {
        const allQuestoes = async() => {
            const dataProvas = await axios.get("http://localhost:4000/prova/")

            setProvas(dataProvas.data.provas)
            // provas.map((e) => e.data.map((t) => t.questoes.map((q)=> console.log(q.questao))))
        }

        allQuestoes()
    })

    
    return(
        <div>
            <Header namePage="Listar" link1="/" nome1="Home" link2="" nome2="Minhas Provas"/>
            {provas.map((e, index)=>(
                <div key={index} className="prova">
                    {e.data.map((q, index)=> (
                    <div key={index} className="secao">
                        <h1>{q.titulo}</h1>
                        <ol className="questoes">
                            {q.questoes.map((t)=> (
                                <li>{t.questao}</li>
                            ))}
                        </ol>
                    </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Listar