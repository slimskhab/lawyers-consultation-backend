const express=require("express")
const router=express.Router();



const{
  addClient,loginClient, getClientById
} = require("../controllers/ClientController")

router.get("/find/:id",getClientById)

router.post("/login",loginClient);

router.post("/",addClient);




module.exports=router