const express=require("express");
const { addReview, getLawyerReview, getAvgLawyerReview } = require("../controllers/ReviewController");
const router=express.Router();

router.post("/add",addReview);
router.get("/:id",getLawyerReview);
router.get("/avg/:id",getAvgLawyerReview)

module.exports=router

