import mongoose from "mongoose"

const main  = async() =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/EnemListado")
    console.log("Conectado ao mongoose !")
}

main().catch((err) => console.log(err.message))

export default mongoose