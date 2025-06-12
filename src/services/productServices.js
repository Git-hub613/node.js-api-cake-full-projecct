import Product from "../models/Product.js";


const getProductBy = async (data) =>{
    const getData = await Product.find(data)

    return getData;
}

const getProductById = async(id)=>{
    const product = await Product.findById(id);
    
    return product;


}

const createProduct = async(data,userData) =>{
    return await Product.create({...data, createdAtBy : userData});

}

const updateProduct  = async (id,data)=>{

    const updateData = await Product.findByIdAndUpdate(id,data,{
        new : true,
        runValidators : true
    });

    return updateData;
}

const deleteProduct = async (id) =>{
    const deleteData = await Product.findByIdAndDelete(id);
    return deleteData;
}

const categoies = async () =>{
    const data = await Product.distinct('category');
    return data;
}

export default {getProductBy,getProductById,createProduct,updateProduct,deleteProduct,categoies};

