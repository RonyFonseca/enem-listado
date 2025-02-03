import bus from "../Utils/bus"

function useflashMessage (){
    function setFlashMessage(msg, type){
        bus.emit("flash",{
            message:msg, 
            type: type
        })
    }
    return {setFlashMessage}
}

export default useflashMessage