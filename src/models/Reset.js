import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    used : {
        type : Boolean,
        default : false
    },
   userDate : {
    type : Date,
    default : Date.now() + 300000,
   },
   token : {
    type : String,
    required : true
   }
})
const model = mongoose.model("Reset",resetPasswordSchema);

export default model;