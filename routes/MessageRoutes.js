const express=require("express")
const router=express.Router();



const{
 allMessages,sendMessage, changeContractStatus, deleteMessage, getContracts
} = require("../controllers/MessageController")

router.get("/:id",allMessages);
router.get("/contract/:id",getContracts);
router.post("/send",sendMessage);
router.post("/update",changeContractStatus);
router.delete("/delete/:id",deleteMessage);





module.exports=router