import fs from 'fs/promises';

fs.readFile("user.json","utf8").then((data)=>{
    console.log(data)
    return fs.readFile("comments.json","utf-8").then((data)=>{
        console.log(data)
    })
}).catch((error)=>{
    console.log(error)
}).finally(()=>{
    console.log("this code is finally")
})