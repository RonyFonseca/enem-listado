import jwt from "jsonwebtoken"

const createToken = async(user, req, res) => {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, process.env.SECRET_JWT)

    res.status(200).json({message:"Você está autenticado", token, name:user.name})
}

export default createToken