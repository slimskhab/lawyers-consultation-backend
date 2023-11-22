const express=require("express")
const router=express.Router();



const{
  addLawyer,loginLawyer,getOneLawyer, getTopLawyers,getLawyerById, getAllLawyers
} = require("../controllers/LawyersController")

router.get("/:id",getOneLawyer)
router.get("/find/:id",getLawyerById)
router.get("/",getAllLawyers)
router.post("/",getTopLawyers)

router.post("/login",loginLawyer);

router.post("/signup",addLawyer);

router.patch("/:id",(req,res)=>{

})



module.exports=router