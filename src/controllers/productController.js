import { ROLES_ADMIN} from "../constant/roles.js";
import productServices from "../services/productServices.js";

const getProducts = async(request,response)=>{
   try {
    const products = await productServices.getProductBy(request.query)
    if(!products) return response.status(404).send("please you are check mongoDB not you Product")
    response.json(products)
   } catch (error) {
    response.status(500).send(error.message);
   }
}

const getUserAll = async(request,response)=>{
    const query = request.query;
    const userId = request.user.id
    try {
        const getAllData = await productServices.getProductBy(query,userId)
        response.json(getAllData)
    } catch (error) {
        response.status(403).send(error.message)
        
    }
}
const getProductById = async(request,response)=>{
    const id = request.params.id;
    try {
        const productId = await productServices.getProductById(id);

    response.json(productId)
    } catch (error) {
        response.status(404).send("product not found");
    }
}

const createProduct = async (request,response)=>{
    const data = request.body;
    const userId = request.user.id;
    const files = request.files;
    try {
        const productData = await productServices.createProduct(data,userId,files)

        if(productData.createdAtBy != userId && !userId.roles.includes(ROLES_ADMIN)) return response.status(403).send("Access deined.")

    if(!productData) return response.status(404).send("products not found")

    response.json(productData)
    } catch (error) {
        response.status(500).send(error.message);
    }
}

const updateProduct = async (request,response)=>{
    const id = request.params.id;
    const data = request.body;
    const userData = request.user;
    const files = request.files
    try {
        
        const updateData = await productServices.updateProduct(userData.id,data,files,id);
        if(updateData.createdAtBy !== userData.id && !userData.roles.includes(ROLES_ADMIN)) return response.status(403).send("Access deined.")
        if(!updateData) return response.status(404).send("product not found");
        response.json(updateData);
    } catch (error) {
        response.status(404).send(error.message);
        
    }
}

const deleteProduct = async (request,response)=>{

    const id = request.params.id;
    const userData = request.user;
    try {
        const deleteData = await productServices.deleteProduct(id);

        if(deleteData.createdAtBy !== userData.id && !userData.roles.includes(ROLES_ADMIN)) return response.status(403).send("Access deined.")
        if(!deleteData) return response.status(404).send("product not found")

            response.send(`you are successfully deleted the product with id : ${id}`);
    } catch(error){
        response.status(404).send(error.message);
    }

}

const categoies = async (request,response)=>{
   try {
     const data = await productServices.categoies();
      if (!data) return response.status(404).send("categories not found or empty");
    response.json(data);
   } catch (error) {
    response.status(404).send(error.message);
    
   }
}


export {getProducts,getProductById,createProduct,updateProduct,deleteProduct,categoies,getUserAll}