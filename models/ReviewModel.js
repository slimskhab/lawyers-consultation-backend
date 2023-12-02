const mongoose = require("mongoose");

const reviewModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        clientId:  {
            type: Number,
            required: true,
        },
        lawyerId:{
            type:Number,
            required:true
        },
        stars:{
            type:Number,
            required:true,
        },
       comment:{
        type:String,
        required:true
       }
        
        
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewModel);

module.exports = Review;