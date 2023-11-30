const mongoose=require("mongoose");

const lawyerSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    profilePic:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: false
    },
    category:{
        type:String,
        required:true
    },
    accountStatus:{
        type:Number,
        default:0
    },
    certifPic:{
        type:String,
        required:true
    },
    funds:{
        type:Number,
        required:true,
        default:0
    }

} ,{ timestamps: true })


const Lawyer=mongoose.model("Lawyer",lawyerSchema)

module.exports=Lawyer;