const mongoose=require("mongoose");

const clientSchema=mongoose.Schema({
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


})


const Client=mongoose.model("Client",clientSchema)

module.exports=Client;