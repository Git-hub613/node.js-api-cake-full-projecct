import jwt from 'jsonwebtoken';
const createJwt = (data)=>{
    return jwt.sign(data,process.env.JWT_SECURET);

}

const jwtVerify = async (authToken)=>{
    return await new Promise((resolve,reject)=>{
        jwt.verify(authToken,process.env.JWT_SECURET,(error,data)=>{
            if(error) return reject(error)

                resolve(data)
        })
    })
}

export {createJwt,jwtVerify};