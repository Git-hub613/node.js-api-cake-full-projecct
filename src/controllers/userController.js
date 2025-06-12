import { response } from "express";
import codeFormatter from "../helpers/codeFormatter.js";
import userFormatter from "../helpers/userFormtter.js";
import userService from "../services/userService.js";
import { formatDate } from "date-fns";

const createUser = async (request,response)=>{

    const data = request.body;
    try {
        
    const userData = await userService.createUser(data);
    if (!userData) return response.status(404).send("user not created!!")
    response.json(userData);

    } catch (error) {
        response.status(500).send(error.message);
        
    }}


    const country = async(request,response)=>{
        try {
            const data = await userService.country();
            response.json(data);
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    const createMerchant = async (request,response)=>{
        const data = request.body;
        try {
            const merchantData = await userService.createMerchant(data)

        response.json(merchantData)
        } catch (error) {
            response.status(403).send(error.message)
        }
    }

    const updateMerchant = async (request,response)=>{
        const data = request.body;
        const id = request.params.id;
        try {
            const merchantData = await userService.updateMerchant(id,data)
            const formatData = userFormatter(merchantData)
            response.json(formatData)
        } catch (error) {
            response.status(403).send(error.message)
        }
    }

    const merchantDelete = async (request,response)=>{
        const id = request.params.id;
        try {
            
        await userService.merchantDelete(id)

        response.send(`deleted successfully your account this id : ${id}`)
        } catch (error) {
            response.status(403).send(error.message)
        }

    }

    const getAllMerchant = async (request,response)=>{
        try {
        const getAllData = await userService.getAllMerchant()

        const mapData = await getAllData.map((data)=> codeFormatter(data));
        console.log(mapData)
        response.json(mapData)
        } catch (error) {
            response.status(403).send(error.message)
            
        }
    }

    const getAllMerchantId = async (request,response)=>{
       const id = request.params.id;
      try {
        const getIdData = userService.getAllMerchantId(id)
        if(!getIdData) return response.status(403).send("id not Athintication!!!")
            response.send(`this user is successfullly delete ${id}`)
      } catch (error) {
        response.status(404).send(error.message)
      }
    }

    const getAllUser = async(request,response)=>{
        const getAllData = await userService.getAllUser()
        try {
            if(!getAllData) return response.status(403).send("User not Access deinad.")
            response.json(getAllData)
        } catch (error) {
            response.status(403).send(error.message)
        }

    }

    const profileImageUpload = async (request,response)=>{
     const file = request.file;
     const userId = request.user.id;
     console.log(userId)
 try {
    const uploadData = await userService.profileImageUpload(userId,file)
    if(!uploadData) return response.status(422).send("upload use not data.")
        response.json(uploadData)
 } catch (error) {
    response.status(422).send(error.message)
    
 }
    }

    export {createUser,country,createMerchant,updateMerchant,merchantDelete,getAllMerchant,getAllMerchantId,getAllUser,profileImageUpload}