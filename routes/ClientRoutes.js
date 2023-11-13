const express=require("express")
const router=express.Router();



const{
  addClient,loginClient
} = require("../controllers/ClientController")
router.get("/",(req,res)=>{

})

router.get("/:id",(req,res)=>{
    const id =req.params.id;
})

router.post("/login",loginClient);

router.post("/",addClient);


router.patch("/:id",(req,res)=>{

})



module.exports=router