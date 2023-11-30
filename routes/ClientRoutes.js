const express=require("express")
const router=express.Router();



const{
  addClient,loginClient, getClientById, addFunds, setFunds
} = require("../controllers/ClientController")

router.get("/find/:id",getClientById)

router.post("/login",loginClient);
router.put("/funds/:id",addFunds);
router.put("/update",setFunds)
router.post("/",addClient);




module.exports=router