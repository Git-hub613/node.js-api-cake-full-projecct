import { jwtVerify } from "../utils/jwt.js";

const auth = (request,response,next)=>{
const authHeaders = request.headers.authorization


let authToken;

if (authHeaders && authHeaders.startsWith("Bearer ")){
    authToken = authHeaders.split(" ")[1]
} else {
    const cookie = request.headers.cookie;
    if(!cookie) return response.status(401).send("Unauthorized : No cookie found");

    authToken = cookie.split("=")[1];

}

    
    jwtVerify(authToken).then((data)=>{
        request.user = data;
        next();
    }).catch(()=>{
        response.status(400).send("Invalid token")
    })
}

export default auth;