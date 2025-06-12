import mongoose from 'mongoose'
import { ORDER_STATUS_CONFIRMED, ORDER_STATUS_DELIVERED, ORDER_STATUS_PENDING, ORDER_STATUS_SHIPPED } from '../constant/order.js';

const OrderSchema = new mongoose.Schema({
    orderNumber : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref  : "User",
        required : true
    },
    orderItems : [
        {
            product : {
                type : mongoose.Types.ObjectId,
                ref : "Product",
                required : true
            },
            quantity :{type : Number,default : 1}
        }
    ],
    totalPrice : {type : Number,required : true},
    status : {
        type : String,
        default : ORDER_STATUS_PENDING,
        enum : [ORDER_STATUS_PENDING,ORDER_STATUS_CONFIRMED,ORDER_STATUS_SHIPPED,ORDER_STATUS_DELIVERED],
        required : true
    },
    shippingAddress : {
        city : {
            type : String,
            required :true,
            default : "Rajbiraj"
        },
        country : {
            type : String,
            required : true,
            default : "Nepal"
        },
        province :{
            type : String,
            default : "Koshi",
            required : true
        },street : {
            type : String,
        }},

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const model = mongoose.model("Order",OrderSchema)

export default model;