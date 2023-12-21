const express=require("express");
const router=express.Router();
const { addReport } = require("../controllers/ReportController");

router.post("/add",addReport)

module.exports=router