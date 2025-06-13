import question from '../utils/question.js'
import Question from '../models/Question.js'
const createQuestion = async (data) =>{
   const qustionQuery = await Question.create({question : data})

    const qustionData = await question(qustionQuery)

    if(!qustionData){
        throw {
            statusCode : 422,
            message : "question is required. please try agin."
        }
    }

    return qustionData
}

export default {createQuestion};