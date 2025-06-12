import Product from "../models/Product.js";


const getProductBy = async (query,userId) =>{
    console.log(query)
    console.log(userId)
    // console.log(query)
    const sort = await JSON.parse(query.sort || "{}");
    const limit = query.limit;
    const offSet = query.offSet;
    const formatter = {};

    const {category,brand,min,max,name} = query;
    if(category) formatter.category ={$regex : category,$options : 'i'}
    const isBrand = brand.split(",")
    if(brand) formatter.brand = {  $in : isBrand} 
    if(min) formatter.price = {$gte : parseFloat(min)};
    if(max) formatter.price = { ...formatter.price, $lte : parseFloat(max)}
    if(name) formatter.name = {$regex : name,  $options : 'i'}
    if(userId) formatter.createdAtBy = userId.split(",")
        if(!userId) throw new Error("user not authroge..")

    const getData = await Product.find(formatter).sort(sort).limit(limit).skip(offSet)

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

