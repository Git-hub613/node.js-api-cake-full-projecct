import kaltiService from "../services/kaltiService.js"

const createPayment = async (request,response)=>{
    const data = request.body;
    try {
    const paymentData = await kaltiService.createPayment(data)
    if(!paymentData) return response.status(422).send("payment is required.")
        response.json(paymentData)
    } catch (error) {
        response.status(422).send(error.message)
        
    }
}

export {createPayment}