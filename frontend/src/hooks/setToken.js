function setToken(type,user){
    const token = user.token
    localStorage[`${type}Item`]("AltToken", token)
    localStorage[`${type}Item`]("UserId", user._id)
    
}

export default setToken