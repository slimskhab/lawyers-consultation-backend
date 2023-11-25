const express=require("express")
const router=express.Router();



const{
  addLawyer,loginLawyer,getOneLawyer, getTopLawyers,getLawyerById, getAllLawyers, getNotVerrifiedLawyers, updateUser
} = require("../controllers/LawyersController")
router.get("/notverrified",getNotVerrifiedLawyers);

router.get("/:id",getOneLawyer)
router.get("/find/:id",getLawyerById)
router.get("/",getAllLawyers)
router.post("/",getTopLawyers)

router.post("/login",loginLawyer);

router.post("/signup",addLawyer);
router.put("/update/:id",updateUser)



module.exports=router