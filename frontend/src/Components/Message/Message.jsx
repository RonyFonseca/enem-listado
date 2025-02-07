import { useState,useEffect } from "react"
import bus from "../../Utils/bus"
import styles from "./Message.module.css"


function Message (){
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")
    const [visible, setVisible] = useState(false)
    const [icon, setIcon] = useState("")

    useEffect(() => {
        bus.addListener('flash', ({message, type, }) => {
            setMessage(message)
            setType(type)
            setVisible(true)

            setTimeout(() => {
                setVisible(false)
            }, 3000);
            if(type=="success"){
                setIcon("check")
            }else if (type=="error"){
                setIcon("x")
            }else if(type=="atencion"){
                setIcon("exclamation")
            }
        })

    }, [])

    return (
        visible && (<div className={`${styles.message} ${styles[type]}`}><i class={`bi bi-${icon}-circle-fill`}></i> {message}</div>)
        // <i class="bi bi-exclamation-circle-fill"></i> EXCLAMAÇÃO
        // <i class="bi bi-check-circle-fill"></i> check
        // <i class="bi bi-x-circle-fill"></i> X
        // <i class="bi bi-plus-circle-fill"></i> É O +
    )
}

export default Message