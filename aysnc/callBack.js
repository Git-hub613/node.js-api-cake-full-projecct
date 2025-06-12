import fs from 'fs';


fs.readFile("user.json","utf8",(error,data)=>{
    if(error) console.log(error)

        console.log(data)

        return fs.readFile("comments.json","utf8",(error,data)=>{
            if(error) console.log(error)

                console.log(data)
        })
})