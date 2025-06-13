 const  productFormtter = async(data,geminiPrompt) =>{
   return await {
    createAt : data.createAt,
    id : data._id,
    name : data.name,
    category : data.category,
    price : data.price,
    brand : data.brand,
    description : geminiPrompt || data.description,
    imageUrl : data.imageUrl
   }

}

export default productFormtter;