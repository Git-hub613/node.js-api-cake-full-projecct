
import { PAYMENT_STATUS_COMPLETED, PAYMENT_STATUS_FAILED } from '../constant/paymentStatus.js';
import Order from '../models/Order.js';
import payViaKalti from '../utils/khalti.js'
import kaltiService from './kaltiService.js';
import Payment from '../models/Payment.js'
import { PAYMENT_METHOD_CASH } from '../constant/paymentMethod.js';
const createOrder = async (data)=>{
    data.orderNumber = crypto.randomUUID()
    console.log(data)
    const getOrder = await Order.create(data).populate("userId",["name","address","email","phone"])
    return getOrder;
}

const getOrderBy = async ()=>{
    const data = await Order.find().sort({createAt : -1}).populate("userId",["name","address","email","phone"]).populate('orderItems',["name","brand","price","category","imageUrl"
    ])
    if(!data) throw new Error("data not find")

    return data;
}

const getOrderByUser = async (id)=>{
    const userData = await Order.find({userId : id}).sort({createAt : -1}).populate("userId",["name","address","email","phone"]).populate('orderItems',["name","brand","price","category","imageUrl"])

    return userData;
}

const getOrderUpdate = async (id,data) =>{
    console.log(data)
    const updateData = await Order.findByIdAndUpdate(id,{status:data},{new : true })
    console.log(updateData)

        return updateData;
}

const deleteOrder = async (id)=>{
    const deleteData = await Order.findOneAndDelete(id)
     
    return deleteData;
}

const checkoutOrder  = async (id,data)=>{
    const order = await Order.findById(id).populate("userId",["name","email","phone","address"]);

    if(!order){
        throw {
            statusCode : 404,
            message : "order not found."
        }
    }

    return await payViaKalti({
        returnUrl: data.returnUrl,
        websiteUrl: data.websiteUrl,
        amount : order.totalPrice,
        orderId : order.id,
        orderName : order.orderNumber,
        customerInfo : order.userId
    })
}

const confirmOrder = async (id,data) =>{
    const order = await Order.findById(id)

    
    const isStatus = data.status == PAYMENT_STATUS_COMPLETED


    await kaltiService.createPayment({
        amount : order.totalPrice,
        paymentMethod : data.paymentMethod || PAYMENT_METHOD_CASH,
        status : isStatus? PAYMENT_STATUS_COMPLETED : PAYMENT_STATUS_FAILED,
        order : id,
        transactionId : data.transactionId
    })

    if(!isStatus){
        throw {
            statusCode : 400,
            message : "status is required"
        }
    }


    return await Order.findByIdAndUpdate(id,{status : PAYMENT_STATUS_COMPLETED},{
        new : true
    })


}

export default {createOrder,getOrderBy,getOrderByUser,getOrderUpdate,deleteOrder,checkoutOrder,confirmOrder}