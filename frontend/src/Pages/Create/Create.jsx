import { useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
import axios from "axios"
import "./Create.css"
function Create(){

    const InputTitulo = useRef("")
    const InputDescricao = useRef("")
    const InputTituloSecao = useRef("")

    const navigate = useNavigate("")

    const [secao, setSecao] = useState([])
    const [text, setText] = useState("")


    // useEffect(() => {
    //     const exibirAsSecoes = () => {
    //         const secoes = [
    //             {
    //                 titulo: "Matemática",
    //                 questoes: []
    //             },
    //             {
    //                 titulo: "Português",
    //                 questoes: []
    //             }
    //         ]
    //         setSecao(secoes)
    //     }
    //     exibirAsSecoes()
    // },[])

    const send = async() => {
        console.log(InputTitulo.current.value)
        console.log(InputDescricao.current.value)
        const token = localStorage.getItem("AltToken")
        const prova = await axios.post("http://localhost:4000/prova/create", {data:secao, titulo: InputTitulo.current.value, descricao:InputDescricao.current.value}, {headers: {Authorization: `Bearer ${token}`},})
        try {
            console.log(prova.data)
        }catch(err){
            console.log(err.message)
        }
        navigate("/")
    }

    const mostrarInput = () => {
        const areaDeTitulo = document.getElementById("add-titulo")

        const botao = document.getElementById("botao")

        const estilo = getComputedStyle(areaDeTitulo).display

        if(estilo == "none"){
            areaDeTitulo.style.display = "block"
            botao.innerText= "-"
        }else {
            areaDeTitulo.style.display = "none"
            botao.innerText= "+"
        }
    }

    const salvarTitulo = () => {
        const todasSecoes = []
        secao.map((e) => todasSecoes.push(e))
        const novasSecoes = [...todasSecoes, {
            titulo: InputTituloSecao.current.value,
            questoes: []
        }]

        InputTituloSecao.current.value = ""
        console.log(novasSecoes)
        setSecao(novasSecoes)
    }


    const atualizarText = (e, index) => {
        setText({...text,[index]:e.target.value})
    }

    const salvarQts = (indice) => {
        let todasSecoes = []
        secao.map((e)=> {
            todasSecoes.push(e)
        })

        todasSecoes.map((e, index) => {
            if(index == indice){
                
                todasSecoes[indice].questoes = [...todasSecoes[indice].questoes, {questao:text[index]}]
                setSecao((todasSecoes))
            }
        })
        setText({[indice]:""})
        console.log(text)
    }

    const mostrarAddqts = (indice) => {
        console.log(indice)
        const body = document.getElementsByClassName("container-secao-escolhida-body")
        const button = document.getElementsByClassName("button-body-qts")

        if(body[indice].style.display=="block"){
            body[indice].style.display="none"
            button[indice].innerHTML = '<i class="bi bi-arrow-up-square-fill"></i>'
        }else {
            body[indice].style.display="block"
            button[indice].innerHTML = '<i class="bi bi-arrow-down-square-fill"></i>'
        }
    }

    return(
        <div>
            <div className="container-create">
                <h2>Criando prova:</h2>
                <div className="input-container">
                    <i class="bi bi-stickies-fill"></i>
                    <input type="text" class="form-control" placeholder="Titulo" ref={InputTitulo}></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-clipboard2-fill"></i>
                    <input type="text" class="form-control" placeholder="Descrição" ref={InputDescricao}></input>
                </div>
                <div id="buttons">
                    <button type="submit" class="btn btn-success" onClick={()=> send()}><i class="bi bi-check2-square"></i> Criar</button>
                    <button type="submit" class="btn btn-danger" onClick={""}><i class="bi bi-backspace-fill"></i> limpar</button>
                </div>
            </div>


            <div className="container-login-register">
                <div className="secao-header">
                    <h2>Seções:</h2>
                    <div>
                        <h2>Adicionar:</h2>
                        <button type="button" id="botao" class="btn btn-success" onClick={mostrarInput}>+</button>
                    </div>
                </div>
                <div className="secao-body">
                    {secao.map((e, index) => (
                        <div className="secao-check" key={index}>
                            <label>{e.titulo}</label>
                        </div>
                    ))}
                </div>
                

                <div id="add-titulo">
                    <div id="add-titulo2">
                        <input type="text" placeholder="Adicione um titulo" ref={InputTituloSecao}/>
                        <button type="button" class="btn btn-success" onClick={salvarTitulo}>Salvar</button>
                    </div>
                </div>
            </div>

            <div className="container-create" id="secao-op-escolhida">
                {secao.map((e, indexT)=>(
                    <div className="container-secao-escolhida" key={indexT}>
                        <div className="container-secao-escolhida-header">
                            <h1>{e.titulo}</h1>
                            <button onClick={() => mostrarAddqts(indexT)} className="button-body-qts"><i class="bi bi-arrow-down-square-fill"></i></button>
                        </div>
                        <div className="container-secao-escolhida-body">
                            <textarea value={text[indexT]}placeholder="Digite a quesão" onChange={(e) => atualizarText(e, indexT)}></textarea>
                            <button class="btn btn-success" onClick={() => salvarQts(indexT)}>Salvar</button>
                        </div>
                        <div className="container-secao-escolhida-questao">
                            {e.questoes.map((qts, index)=>(
                                <div key={index}>
                                    <div className="container-questao">
                                        <div>
                                            <h1>Questão {index+1}</h1>
                                        </div>
                                        <div className="questao">
                                            <p className="teste">{qts.questao}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Create