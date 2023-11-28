const mongoose = require("mongoose");

const PaymentMethodModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        userId:{
            type:Number,
            required:true,
        },
        holderName:{
            type:String,
            required:true,
        },
        creditCardNumber:{
            type:String,
            required:true
        },
        ccv2:{
            type:Number,
            required:true
        },
        expirationDate:{
            type:String,
            required:true
        }
        
        
        
    },
    { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", PaymentMethodModel);

module.exports = PaymentMethod;