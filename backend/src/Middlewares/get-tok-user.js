const getUserToken = async(req) => {
    const barrearToken = req.headers.authorization
    if (!barrearToken) {
        throw new Error("Token não fornecido no cabeçalho Authorization.");
    }
    const token = barrearToken.split(" ")[1]
    if (!token) {
        throw new Error("Token inválido.");
    }
    return token
}

export default getUserToken