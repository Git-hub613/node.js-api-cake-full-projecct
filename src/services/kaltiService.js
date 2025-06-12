import Payment from '../models/Payment.js'
const createPayment = async (data) =>{
    const paymentData = await Payment.create(data)
    return paymentData;
}

export default {createPayment};