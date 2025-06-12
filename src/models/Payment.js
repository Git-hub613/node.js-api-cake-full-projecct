import mongoose from 'mongoose';
import { PAYMENT_STATUS_COMPLETED, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_PENDING } from '../constant/paymentStatus.js';
import { PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE } from '../constant/paymentMethod.js';

const paymentSchema = new mongoose.Schema({
    amount : {type : Number,required : true},
    paymentMethod : {
        type : String,
        required : true,
        enum : [PAYMENT_METHOD_CASH,PAYMENT_METHOD_CARD,PAYMENT_METHOD_ONLINE]
    },
    status : {
        type : String,
        enum : [PAYMENT_STATUS_PENDING,PAYMENT_STATUS_COMPLETED,PAYMENT_STATUS_FAILED],
        default : [PAYMENT_STATUS_PENDING]
    },
    createAt : {
        type :Date,
        default : Date.now()
    },
    order : {
        type : mongoose.Types.ObjectId,
        ref : "Order",
        required : true
    },
    transactionId:String
})

const model = mongoose.model("Payment",paymentSchema)

export default model;