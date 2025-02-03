import axios from "axios"
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react"
import "./Listar.css"
function Listar () {

    const {id} = useParams()
    const [provas, setProvas] = useState([])

    useEffect(() => {
        const allQuestoes = async() => {
            const dataProvas = await axios.get(`http://localhost:4000/prova/listing/${id}`)

            setProvas(dataProvas.data.prova.data)
            // console.log(dataProvas.data.prova.data)
            // provas.map((e) => e.data.map((t) => t.questoes.map((q)=> console.log(q.questao))))
        }

        allQuestoes()
    })

    
    return(
        <div>
            {/* {provas.map((e, index)=>(
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
            ))} */}
            {provas.map((e)=> (
                <div className="prova">
                    <h1>{e.titulo}</h1>
                    <div className="questoes">
                        {e.questoes.map((e, index)=> (
                            <div>
                                <div>
                                    <h2>Questão:{index+1}</h2>
                                    <input  type="checkbox"/>
                                </div>
                                <p>{e.questao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Listar