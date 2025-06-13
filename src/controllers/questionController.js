import qustionService from "../services/qustionService.js";

const createQuestion = async (request,response)=>{
    const data = request.body.question;

  try {
      const questionData = await qustionService.createQuestion(data)

      console.log(questionData)

       if(!questionData) return response.status(422).send("question is required.")

        response.json(questionData)
  } catch (error) {

    response.status(400).send(error.message)
    
  }
}

export {createQuestion};