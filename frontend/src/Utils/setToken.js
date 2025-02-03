function setToken(type,user){
    const token = user.token
    localStorage[`${type}Item`]("AltToken", token)
}

export default setToken