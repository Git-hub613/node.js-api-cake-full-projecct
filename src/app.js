import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/productRoute.js';
import connectDB from './config/dataBase.js';
import userRouter from './routes/userRoute.js';
import logger from './middlewares/logger.js';
import authRouter from './routes/authRouter.js';

const app = express()

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.use(logger)

dotenv.config()

connectDB();


const PORT = process.env.PORT || 5000

app.get("/",(request,response)=>{
    response.json({
        name : "Roshan Sardar",
        running : PORT,
        websiteName : "Kirna-Cake",
      version: "1.0.0",
      license: "MIT",
    })
})

app.use("/api/products",router)
app.use("/api",userRouter)
app.use("/api/auth",authRouter)



app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}...`)
})