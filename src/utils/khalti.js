import axios from "axios";
const payViaKalti = async (data)=>{
    const {
        returnUrl,
        websiteUrl,
        amount,
        orderId,
        orderName,
        customerInfo
    } = data

     if(!returnUrl) throw{message : "return url is required."}
        if(!websiteUrl) throw{message : "website url is required."}
            if(!amount) throw{message : "Amount is required."}
                if(!orderId) throw{message : "Order Id is required."}
                    if(!orderName) throw{message : "Order Name is required."}
                        if(!customerInfo) throw{message : "CustomerInfo is required."}
    const requestBody = {
        return_url : returnUrl,
        website_url : websiteUrl,
        amount : amount,
        purchase_order_id : orderId,
        purchase_order_name : orderName,
        customer_info : customerInfo

    }
    const result =  await axios.post(process.env.KHALTI_URL,requestBody,{
        headers : {
            Authorization : `Key ${process.env.KHALTI_API_KEY}`,
            "content-Type": "application/json",
        }

    })

    if(!result){
        throw {
            statusCode : 422,
            message : "result is required."
        }
    }

    return result.data;
};

export default payViaKalti;