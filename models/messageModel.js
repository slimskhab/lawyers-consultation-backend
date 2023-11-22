const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        senderId:  {
            type: Number,
            required: true,
        },
        content:{
            type:String,
            required:true
        },
        chatId:{
            type:Number,
            required:true,
        },
        isContract:{
            type:Boolean,
        },
        contractStartDate:{
            type:Date
        },
        contractEndDate:{
            type:Date
        },
        contractFee:{
            type:Number
        },
        contractStatus:{
            type:Number,
            default:0
        }
        
        
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;