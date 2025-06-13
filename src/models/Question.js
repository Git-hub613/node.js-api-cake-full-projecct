import mongoose from "mongoose";


const questionSchema =  new mongoose.Schema({
    question : {
        type : String,
        required : true
    }
})

const model = mongoose.model("Question",questionSchema)

export default model;