const express=require("express")
const router=express.Router();



const{
  addLawyer,loginLawyer
} = require("../controllers/LawyersController")
router.get("/",(req,res)=>{

})

router.get("/:id",(req,res)=>{
    const id =req.params.id;
})

router.post("/login",loginLawyer);

router.post("/",addLawyer);


router.patch("/:id",(req,res)=>{

})



module.exports=router