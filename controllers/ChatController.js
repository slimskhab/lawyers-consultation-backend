const Chat=require("../models/chatModel");
const Counter=require("../models/counterModel")

const accessChat=async(req,res)=>{
    try{
        const {clientId, lawyerId} =req.body;

        if ((!clientId)||(!lawyerId)) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
          }
        
          var isChat = await Chat.findOne({
            users:{$all:[clientId,lawyerId]}
          });

    
        if(isChat){

            res.status(200).json({status:"success",message:"found chat",chat:isChat})
        }else{
            const counter = await Counter.findOneAndUpdate(
                { id: "autovalchat" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true } 
              );
            const chat = new Chat({
                id:counter.seq,
                users:[clientId,lawyerId]
              });
              chat.save();
              res.status(201).json({status:"success",message:"created chat",chat:chat})
        }
    }catch(e){
        res.status(500).json({
            message: "Server Error!",
        });
    }
    
}

const fetchChats = async (req, res) => {
    try {
      const chats = await Chat.find({
        users: { $in: req.body.userId },
      }).sort({ updatedAt: -1 });
  
      res.status(200).json({ chats: chats });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports={accessChat,fetchChats}