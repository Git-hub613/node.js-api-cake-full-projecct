import User from '../models/User.js'
import Reset from '../models/Reset.js'
import bcrypt from 'bcryptjs'

const login = async (data) => {

    const user = await User.findOne({
        $or : [{email : data.email},{phone : data.phone},]
    })

    if(!user) throw new Error("user not found")
   const isPasswordMatch = bcrypt.compareSync(data.password,user.password);
   if(!isPasswordMatch) throw new Error("email or password is incorrect");
    
   return user;
}

const createRegister = async (data)=>{
const registerData = await User.findOne({
    $or : [{email : data.email},{phone : data.phone},]
})
 
 if(registerData) throw new Error("user already exist")
 
    const passwordHash = bcrypt.hashSync(data.password)
    const user = await User.create({
        name : data.name,
        email : data.email,
        password : passwordHash,
        phone : data.phone,
        roles : data.roles,
        address : data.address
    })

    return user;
}

const forgetPassword = async(email)=>{
    const otp = Math.floor(Math.random()* 1000000)
    const resetData = await User.findOne({email})
    console.log(resetData)

    if(!resetData) {
        throw {
            statusCode : 404,
            message : "Invaild Token."
        }
    }

    await Reset.create({
        userId : resetData._id,
        token : otp,
    })

   
    return {message :" reset password has been opt code sent"}

}

const resetPassword = async (userId,token,password) =>{
    const data = await Reset.findOne({
        userId,
        userDate : {$gt : Date.now()}
})
 console.log(data)
    if(!data || data.token !== token){
        throw {
            statusCode : 404,
            message : "Invaild Token"
        }
    }

    if(data.used){
        throw {
            statusCode : 404,
            message : "token already exists."
        }
    }

    const hashPassword = bcrypt.hashSync(password)

    await User.findByIdAndUpdate(data._id,{
        password : hashPassword,
    })

    await Reset.findById(data._id,{
        userId : true,
    })



    return {message : "password reset successfully"}
    

    
}

export default {login,createRegister,forgetPassword,resetPassword,resetPassword};