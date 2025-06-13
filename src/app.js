import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/productRoute.js';
import connectDB from './config/dataBase.js';
import userRouter from './routes/userRoute.js';
import logger from './middlewares/logger.js';
import authRouter from './routes/authRouter.js';
import multer from 'multer';
import cloudinaryConnect from './config/cloudniry.js';
import orderRouter from './routes/orderRouter.js';
import paymentRouter from './routes/kaltiRouter.js';
import questionRoute from './routes/questionRouter.js';

const app = express()

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

cloudinaryConnect()

const upload = multer({
    storage : multer.memoryStorage()
})

app.use(logger)

dotenv.config()

connectDB();


const PORT = process.env.PORT || 5000

app.get("/",(request,response)=>{
    response.json({
        name : "Roshan Sardar",
        running : PORT,
        websiteName : "Kirna-Cake",
        author : "Roshan Sardar",
      version: "1.0.0",
      license: "MIT",
    })
})

app.use("/api/products",upload.array('images',6),router)
app.use("/api",upload.single('image'),userRouter)
app.use("/api/auth",authRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/question",questionRoute)



app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}...`)
})