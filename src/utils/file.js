import {v2 as cloudinary} from 'cloudinary';
const forFile = [];
const fileUpload = async (files) =>{
   for(const file of files ){
    const result = await new Promise((resolve,reject)=>{
    cloudinary.uploader.upload_stream({
        folder : "coke-asset",
    },(error,data)=>{
        if(error) return reject(error)

            resolve(data)
    }).end(file.buffer);
   }); forFile.push(result)
   } 
   return forFile;
}

export default fileUpload;