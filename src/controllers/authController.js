
import codeFormatter from "../helpers/codeFormatter.js";
import authService from "../services/authService.js"
import {createJwt} from "../utils/jwt.js";

const login = async (request,response)=>{

    const {phone,email,password} = request.body;

    if(!email == !phone) return response.status(422).send("phone or email is required")
            if(!password) return response.status(422).send("password is required")
    try {
        const loginData = await authService.login(request.body)
        const formatter = codeFormatter(loginData);
        const token = createJwt(formatter);
    response.cookie("authToken",token)
    response.json(formatter);
    } catch (error) {
        response.status(404).send(error.message);
    }

}

const register = async(request,response)=>{
    const {name,email,password,confirmPassword,address,phone,roles} = request.body;

    if(!name) return response.status(422).send("name is required");
    if(!email) return response.status(422).send("email is required");
        if (!address?.city) return response.status(422).send("address is required/.");
      if(!phone) return response.status(422).send("phone is required ");
      if (!roles) return response.status(422).send("roles is required");
      if(password !== confirmPassword) return response.status(422).send("password do not match.")

    try {
        const data = await authService.createRegister(request.body)
        const formatter = codeFormatter(data);
        const token = createJwt(formatter);
    response.cookie("authToken",token)

    response.json(codeFormatter(formatter))
    } catch (error) {

        response.status(404).send(error.message)
        
    }

}



export {login,register};