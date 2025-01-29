import User from "../Model/User.js"
import bcrypt from "bcrypt"
import createToken from "../Middlewares/create-token.js"

class UserController{

    static async login(req, res){
        const {email, password} = req.body

        const user = await User.findOne({email:email})

        if(!user){
            res.status(422).json({message: "Este usuário não existe!"})
            return
        }

        if(!email){
            res.status(422).json({message: "O campo email está sem nada"})
            return
        }
        if(!password){
            res.status(422).json({message: "O campo senha está sem nada"})
            return
        }

        const pass =  await bcrypt.compare(password, user.password)
        
        if(!pass){
            res.status(422).json({message: "Senha inválida"})
            return
        }

        await createToken(user, req, res)
    }

    static async registerUser(req, res){
        const {name, email, password, confirmPassword} = req.body

        const userExist = await User.findOne({email:email})
        if(userExist){
            res.status(422).json({message: "Este usuário ja existe!"})
            return
        }

        if(!name){
            res.status(422).json({message: "O campo nome está sem nada"})
            return
        }
        if(!email){
            res.status(422).json({message: "O campo email está sem nada"})
            return
        }
        if(!password){
            res.status(422).json({message: "O campo senha está sem nada"})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message: "O campo confirmar está sem nada"})
            return
        }
        if(password !== confirmPassword){
            res.status(422).json({message: "O campo senha está diferente do campo confirmar senha"})
            return
        }

        // cripitografando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const person = {
            name,
            email, 
            password: passwordHash
        }

        const newUser = new User(person)

        try{
            const user = await newUser.save()
            await createToken(user, req, res)
        }catch(err){
            console.log(err.message)
        }
    }
}

export default UserController