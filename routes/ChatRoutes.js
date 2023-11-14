const express=require("express")
const router=express.Router();



const{
  accessChat, fetchChats
} = require("../controllers/ChatController")

router.post("/",accessChat)

router.post("/all",fetchChats)




module.exports=router