import mongoose from "../db/conn.js"
import {Schema} from "mongoose"

const Prova = mongoose.model("Prova", 
    new Schema({
        titulo: {
            type:String, 
            required: true
        },
        descricao: {
            type: String,
        },
        data: [{}],
        dono_da_prova:{}
    },{timestamps: true})
)

export default Prova