import fs from 'fs';

const promiseData = new Promise((resolve,reject)=>{
    fs.readFile("user.json","utf8",(error,data)=>{
        if(error) return reject(error)

            resolve(data)
    })

    fs.readFile("comments.json","utf8",(error,data)=>{
        if(error) return reject(error)

            resolve(data)
    })
})

promiseData.then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
}).finally(()=>{
    console.log("this code is finally")
})