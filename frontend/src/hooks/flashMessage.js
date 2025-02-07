import bus from "../Utils/bus"
import soundError from "../Tracks/error.mp3"
import soundSuccess from "../Tracks/success.mp3"
import soundDeslog from "../Tracks/deslogar.mp3"
function useflashMessage (){
    function setFlashMessage(msg, type){
        bus.emit("flash",{
            message:msg, 
            type: type
        })
        if(type=="error"){
            new Audio(soundError).play()
        }else if (type=="success"){
            new Audio(soundSuccess).play()
        }else if (type="atention"){
            new Audio(soundDeslog).play()
        }
    }
    return {setFlashMessage}
}

export default useflashMessage