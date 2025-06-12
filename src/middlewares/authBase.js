const authBased = (roles)=>{
    return (request,response,next)=>{

        if(request.user.roles.includes(roles)) return next();

        response.status(400).send("Access deined.")
    }
}

export {authBased};