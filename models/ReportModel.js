const mongoose = require("mongoose");

const reportModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        reporterId:{
            type:Number,
            required:true
        },
        reportedId:{
            type:Number,
            required:true
        },
        reportContent:{
            type:String,
            required:true
        },
       reportStatus:{
        type:Number,
        default:0
       }
        
    },
    { timestamps: true }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;