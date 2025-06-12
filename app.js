import http from 'http';
import { stringify } from 'querystring';

const app = http.createServer((request,response)=>{
    
    response.writeHead(200,{"content-type":"application/Json"})

    const data = {
        "name" : "Roshan Sardar",
        "running" : 5000,
        "websiteName" : "Kirna-Cake",
      "version": "1.0.0",
      "license": "MIT",
    }
    if(request.url == "/about"){
        response.end("this is about page")
    } else if (request.url == "/products"){
        response.end("this is products page")
    } else if (request.url ==  "/contact"){
        response.end("this is contact page")
    } else if (request.method == "GET"){
        response.end("this is read method")
    } else if (request.method == "POST"){
        response.end("products create")
    } else {
        response.end("page not found")
    }
    response.end(JSON.stringify(data))
})

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}...`);
})