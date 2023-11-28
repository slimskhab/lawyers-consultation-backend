const express=require("express");
const router=express.Router();
const { addPaymentMethod, findPayementMethods, deleteMethod } = require("../controllers/PaymentMethodController");

router.post("/add",addPaymentMethod)
router.get("/:id",findPayementMethods)
router.delete("/delete/:id",deleteMethod)
module.exports=router

