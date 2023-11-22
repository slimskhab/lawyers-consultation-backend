const express=require("express")
const router=express.Router();



const{
 allMessages,sendMessage, changeContractStatus, deleteMessage
} = require("../controllers/MessageController")

router.get("/:id",allMessages);
router.post("/send",sendMessage);
router.post("/update",changeContractStatus);
router.delete("/delete/:id",deleteMessage);





module.exports=router