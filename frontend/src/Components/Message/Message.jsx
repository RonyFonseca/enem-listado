import { useState,useEffect } from "react"
import bus from "../../Utils/bus"
import styles from "./Message.module.css"
function Message (){
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setMessage(message)
            setType(type)
            setVisible(true)

            setTimeout(() => {
                setVisible(false)
            }, 3000);
        })

    }, [])

    return (
        visible && (<div className={`${styles.message} ${styles[type]}`}>{message}</div>)
    )
}

export default Message