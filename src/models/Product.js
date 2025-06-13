import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    brand : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
        min : 0

    },
    description : {
        type : [String],
    },
    image : {
        type : String,
    },
    createAt : {
        type : Date,
        default : Date.now,
    },
    imageUrl : {
        type : [String]
    },
    createdAtBy: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }
})

const Model = mongoose.model("Product",productSchema)

export default Model;