import {ROLES_MERCHANT, ROLES_USER } from '../constant/roles.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
const createUser = async (Data)=>{
    const userData = await User.create(Data);
    return userData;
}

const createMerchant = async (data)=>{
    const registerData = await User.findOne({
        $or : [{email : data.email},{phone : data.phone},]
    })
     
     if(registerData) throw new Error("user already exist")
    const isHashPassword = bcrypt.hashSync(data.password)

     if(!isHashPassword) throw new Error("password not hash")

        const merchantData = await User.create({
            name : data.name,
            address : data.address,
            email : data.email,
            password : isHashPassword,
            phone : data.phone,
            createAt : data.createAt,
             roles : [ROLES_MERCHANT,ROLES_USER]})

    return merchantData;
        
}

const updateMerchant = async(id,data)=>{

   const merchantData = User.findByIdAndUpdate(id,{
        name : data.name,
        password : data.password,
        address : data.address,
        profileImage : data.profileImage,
        phone : data.phone
    },{new : true})

    return merchantData;
}

const merchantDelete = async (id) =>{
    const dataDelete = await User.findByIdAndDelete(id)

    return dataDelete;
}

const getAllUser = async ()=>{
    const getAllData = await User.find();

    return getAllData;
}

const getAllMerchant = async ()=>{
    const getData = await User.find({})
    if(!getData) throw new Error("merchant get all profile invilid.")
    return getData;
}

const getAllMerchantId = async(id)=>{
    const idData = await User.findById(id)
    if(!idData) throw new Error("your account id do not match!!")

        return idData;
}

const country = async ()=>{
    const data = await User.distinct('country'
    )

    return data;
}

export default {createUser,country,createMerchant,updateMerchant,merchantDelete,getAllMerchant,getAllMerchantId,getAllUser};