import { ROLES_ADMIN} from "../constant/roles.js";
import productFormtter from "../helpers/productFormtter.js";
import productServices from "../services/productServices.js";

const getProducts = async(request,response)=>{
    const data = request.query;
   try {
    const products = await productServices.getProductBy(data)
    const formatterCode = await products.map((product)=> product)
    if(!formatterCode) return response.status(404).send("please you are check mongoDB not you Product")
    response.json(formatterCode)
   } catch (error) {
    response.status(500).send(error.message);
   }
}

const getUserAll = async(request,response)=>{
    const query = request.query;
    const userId = request.user.id
    try {
        const getAllData = await productServices.getProductBy(query,userId)
        const mapData = await getAllData.map((product)=>product)
        response.json(mapData)
    } catch (error) {
        response.status(403).send(error.message)
        
    }
}
const getProductById = async(request,response)=>{
    const userId= request.params.id;
    try {
        const productId = await productServices.getProductById(userId);

        if(!productId) return response.status(400).send("product id not found..")

    response.json(productId)
    } catch (error) {
        response.status(404).send(error.message);
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

const brands = async (request,response)=>{
    const brands = request.params.brands;

    try {
        const brandsData = await productServices.getProductBy({brand : brands})

    response.json(brandsData)
    } catch (error) {
        response.status(400).send(error.message)
    }

}

const category = async (request,response)=>{
    const categoryId = request.params.category;

    try {
      const categoryData = await productServices.getProductBy({category : categoryId})

    response.json(categoryData)  
    } catch (error) {
        response.status(404).send(error.message)
    }
}


export {getProducts,getProductById,createProduct,updateProduct,deleteProduct,categoies,getUserAll,brands,category}