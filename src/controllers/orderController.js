import orderService from "../services/orderService.js"

const createOrder = async (request,response)=>{
   
    const input = request.body;
    const userData = request.user;
    console.log(userData)
    console.log(input)
   
        if(!input.orderNumber) return response.status(422).send("order number is required.")
        if(!input.orderItems || input.orderItems.length == 0) return response.status(422).send("oreder items are required.")
            if(!input.orderItems[0].product) return response.status(422).send("product items are required.")
                if(!input.totalPrice) return response.status(422).send("price is required.")
                    if(!input.userId) input.userId = userData.id
                    if(!input.shippingAddress){
                        if(!userData.address)
                            return response.status(422).send("shipping address is required.")

                        input.shippingAddress == userData.address
                    }
    try {
        const data = await orderService.createOrder(input)
    response.json(data)
    } catch (error) {
         response.status(422).send(error.message)
    }
       
}

const getOrderBy = async (request,response)=>{
    try {
        const data = await orderService.getOrderBy()
    response.json(data)
    } catch (error) {

        response.status(404).send(error.message)
        
    }
}

const getOrderByUser = async(request,response)=>{
    const userId = request.user.id;
   try {
     const userData = await orderService.getOrderByUser(userId)
    if(!userData) return response.status(404).send("user id not access.")

        response.json(userData)
   } catch (error) {
    response.status(404).send(error.message)
    
   }
}

const getOrderUpdate = async (request,response)=>{
    const id = await request.params.userId;
    console.log(id)
    const data = await request.body.status

    console.log(data)

    if(!data.returnUrl) return response.status(400).send("return Url is required.")
    
    try {
        
    const updateData = await orderService.getOrderUpdate(id,data)
    
    if(!updateData) return response.status(422).send("update Date is required.")

        response.json(updateData)
    } catch (error) {

        response.status(422).send(error.message)
        
    }
}

const checkOutOrder = async (request,response)=>{
    const id = request.params.id;
    const input = request.body;

    try {
        const order = await orderService.checkoutOrder(id,input)
        console.log(order)
     
        response.json(order)
    }catch (error) {

        response.status(400).send(error.message)
        
    }
}

const deleteOrder = async(request,response)=>{
    const id = request.params.id;
    await orderService.deleteOrder(id)

    response.send(`order id of deleted successfully thid id delete : ${id}`)
}

const confirmOrder = async (request,response)=>{
    const id = request.params.id
    console.log(id)
    const input = request.body;
    console.log(input)

    if(!input.status) return response.status(400).send("status is required.")

    try {
      const order = await orderService.confirmOrder(id,input)


      if(!order) return response.status(400).send("order not found")
     
        response.json(order)
        
    } catch (error) {

        response.status(400).send(error.message)
        
    }
}

export {getOrderBy,createOrder,getOrderByUser,getOrderUpdate,deleteOrder,checkOutOrder,confirmOrder}