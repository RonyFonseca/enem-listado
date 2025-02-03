import Prova from "../Model/Prova.js"
import getUserToken from "../Middlewares/get-tok-user.js"
import jtw from "jsonwebtoken"

class ProvaController{
    static async createProva(req, res){
        const {titulo, descricao, data} = req.body
        console.log(titulo, descricao, data)

        if(!titulo){
            res.status(422).json({message: "O campo titulo"})
            return 
        }

        if(!descricao){
            res.status(422).json({message: "O campo descrição está sem poha nem uma"})
            return
        }

        const token = await getUserToken(req)
        const userToken = jtw.verify(token, process.env.SECRET_JWT)

        const prova = {
            titulo,
            descricao,
            dono_da_prova: {
                userId: userToken._id,
                name: userToken.name,
                email: userToken.email
            },
            data: data
        }

        const newProva = new Prova(prova)

        try {
            const prova = newProva.save()
            res.status(200).json({prova})
        }catch(err){
            res.status(422).json({err})
        }


    }

    static async getAllProva(req, res){
        const provas = await Prova.find()
        res.status(200).json({provas})
    }

    static async listing(req, res){
        const id = req.params.id
        const prova = await Prova.findById({_id:id})
        res.status(200).json({prova})
    }
}

export default ProvaController