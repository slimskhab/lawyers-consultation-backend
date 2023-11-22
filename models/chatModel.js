const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        users: [
            { type: Number,required:true, },
            
        ],
        latestMessage: {
            type: String,
        },
        
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;