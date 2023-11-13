const mongoose=require("mongoose");

const counterSchema=mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    seq:{
        type:Number,
        required:true
    }

})


const Counter=mongoose.model("Counter",counterSchema)

module.exports=Counter;