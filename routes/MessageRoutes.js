const express=require("express")
const router=express.Router();



const{
 allMessages,sendMessage
} = require("../controllers/MessageController")

router.get("/:id",allMessages);
router.post("/send",sendMessage)





module.exports=router