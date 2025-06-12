import Product from "../models/Product.js";
import fileUpload from "../utils/file.js";


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

const createProduct = async(data,userId,files) =>{

    const image = await fileUpload(files)

    return  await Product.create({name : data.name, category : data.category, brand : data.brand, price : data.price, imageUrl :image?.map((items)=> items?.url) 
        , createdAtBy : userId});

}

const updateProduct  = async (userId,data,files,id)=>{
    const image = await fileUpload(files)

    const updateData = await Product.findByIdAndUpdate(id,{name : data.name,category : data.category, brand : data.brand, price : data.price , createBy : userId,images : image.map((items)=>items?.url)},{
        new : true
    });

    if(!image || !updateData) throw new Error("products not update please. try agin")

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

