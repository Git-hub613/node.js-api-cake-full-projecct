import mongoose from 'mongoose';
import { EMAIL_REGEX } from '../constant/regex.js';
import { ROLES_ADMIN, ROLES_MERCHANT, ROLES_USER } from '../constant/roles.js';
const userSchema = new mongoose.Schema({
    address : {
        city : {
            type : String,
            default : 'Rajbiraj'
        },
        country : {
            type : String,
            default : 'Nepal'
        },
        province : {
            type : String,
            default : 'koshi'
        },
        street : {
            type : String,
        }
    },
    name :  {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowerCase : true,
        trim : true,
        validator : {
            validate : ((value)=>{
                return EMAIL_REGEX.test(value);
            }),
            message : "invalid email address!!!"
        }
    },
    password : {
        type : String,
        required : true,
        minlegth : 8
    },

    phone : {
        type : String,
        required : true,
        unique : true
    },
    roles : {
        type : [String],
        default : [ROLES_USER],
        enum : [ROLES_ADMIN, ROLES_MERCHANT, ROLES_USER]
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },

    rating : {
        type : Number,
        default : 5,
        min : 1,
        max : 5,
    },
    profileImage : {
        type : String,
    }
})

const Model = mongoose.model("User",userSchema)

export default Model;