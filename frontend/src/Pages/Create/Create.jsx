import { useRef, useState, useContext, useEffect } from "react"
import { useNavigate} from "react-router-dom"
import { ContextProva } from "../../Context/ProvaContext"
import {Context} from "../../Context/UseContext.jsx"
import "./Create.css"
function Create(){

    const InputTitulo = useRef("")
    const InputDescricao = useRef("")
    const InputTituloSecao = useRef("")

    const {createProva} = useContext(ContextProva)

    const navigate = useNavigate()
    

    const [secao, setSecao] = useState([])
    const [text, setText] = useState("")

    const send = async() => {
        const prova = {
            data:secao, 
            titulo:InputTitulo.current.value,
            descricao:InputDescricao.current.value,
        }
        await createProva(prova)
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

    const limpar = () => {
        InputTitulo.current.value = ""
        InputDescricao.current.value = ""
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
        const body = document.getElementsByClassName("container-text-area-secao")
        const button = document.getElementsByClassName("button-body-qts")

        if(body[indice].style.display=="flex"){
            body[indice].style.display="none"
            button[indice].innerHTML = '<i class="bi bi-arrow-down-square-fill"></i>'
        }else {
            body[indice].style.display="flex"
            button[indice].innerHTML = '<i class="bi bi-arrow-up-square-fill"></i>'
        }
    }

    return(
        <div id="container-create">
            <div>
                <h2>Criando prova:</h2>
                <div className="input-container">
                    <i class="bi bi-stickies-fill"></i>
                    <input type="text" class="form-control" placeholder="Titulo" ref={InputTitulo}></input>
                </div>
                <div className="input-container">
                    <i class="bi bi-clipboard2-fill"></i>
                    <input type="text" class="form-control" placeholder="Descrição" ref={InputDescricao}></input>
                </div>
                <label className="label-aviso">Quando adicionar todas as informações você deve criar, sua prova vai ser salva e você vai ser redirecionado para a home.</label>
                <div id="buttons">
                    <button type="submit" class="btn btn-success" onClick={()=> send()}><i class="bi bi-check2-square"></i> Criar</button>
                    <button type="submit" class="btn btn-danger" onClick={limpar}><i class="bi bi-backspace-fill"></i> limpar</button>
                </div>
            </div>


            <div className="container-criar-secao">
                <div className="secao">
                    <h2>Seções:</h2>
                    <label className="label-aviso">Aqui é um lugar para você adicionar grupos de questoes Ex: Matemática</label>
                    <div className="secao-buttons">
                        <input type="text" class="form-control" placeholder="Adicione um titulo" ref={InputTituloSecao}/>
                        <button type="button" class="btn btn-success" onClick={salvarTitulo}>Salvar</button>
                    </div>
                </div>
            </div>

            <div className="container-questoes-main">
                {secao.map((e, indexT)=>(
                    <div className="container-gerar-questoes" key={indexT}>
                        <div className="container-questoes-header">
                            <h1>{e.titulo}</h1>
                            <div>
                                <button><i class="bi bi-trash3-fill"></i></button>
                                <button onClick={() => mostrarAddqts(indexT)} className="button-body-qts"><i class="bi bi-arrow-up-square-fill"></i></button>
                            </div>
                        </div>
                        <div className="container-text-area-secao" style={{display:"flex"}}>
                            <textarea value={text[indexT]}placeholder="Digite a quesão" onChange={(e) => atualizarText(e, indexT)}></textarea>
                            <button class="btn btn-success" onClick={() => salvarQts(indexT)}>Criar questão</button>
                        </div>
                        <div className="container-exibindo-questao">
                            {e.questoes.map((qts, index)=>(
                                <div key={index}>
                                    <div className="container-questao">
                                        <div>
                                            <h3>Questão {index+1}</h3>
                                            <button><i class="bi bi-trash3-fill"></i></button>
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