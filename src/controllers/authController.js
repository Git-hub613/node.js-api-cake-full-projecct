
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
    response.json({...formatter,token});
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

    response.json({...formatter,token})
    } catch (error) {

        response.status(404).send(error.message)
        
    }

}

const logout = async (request,response)=>{
    try {
         await response.clearCookie("authToken")

         response.send('logout')
    } catch (error) {
        response.status(400).send(error.message)
    }
}

const forgetPassword = async(request,response) =>{

    const emailData = request.body.email
    
try {
    const resetData = await authService.forgetPassword(emailData)
    console.log(resetData)

if(!resetData) return response.status(404).send("your data is not reset.")
    response.json(resetData)
} catch (error) {
    response.status(404).send(error.message)
}

}


const resetPassword = async (request,response) =>{
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    const userId = request.params.userId;
    const token = request.query.token;
  try {
    
    if(password !== confirmPassword) return response.status(404).send("email do not match.");
    if(!confirmPassword) return response.status(404).send("confirm password is required.")
    if(!password) return response.status(404).send("password is required.")

    const data = await authService.resetPassword(userId,token,password)
    response.json(data)
  } catch (error) {
    response.status(404).send(error.message)
  }


}
export {login,register,logout,forgetPassword,resetPassword};