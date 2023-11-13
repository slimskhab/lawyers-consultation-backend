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

})


const Lawyer=mongoose.model("Lawyer",lawyerSchema)

module.exports=Lawyer;