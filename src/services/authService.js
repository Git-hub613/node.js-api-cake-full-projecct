import User from '../models/User.js';
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

export default {login,createRegister};