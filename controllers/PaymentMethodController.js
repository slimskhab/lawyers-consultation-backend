const PaymentMethod = require("../models/PaymentMethodModel")
const Counter = require("../models/counterModel")
const addPaymentMethod = async (req, res) => {
    try {
        
        const alreadyPayementMethod=await PaymentMethod.findOne({creditCardNumber:req.body.creditCardNumber})
        if(alreadyPayementMethod){
            res.status(401).json({
                status: "failed",
                message: "Payement Method Already Exists!",
            });
            return;
        }
        const counter = await Counter.findOneAndUpdate(
            { id: "autovalPaymentMethod" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const paymentMethod = new PaymentMethod({
            id: counter.seq,
            holderName: req.body.holderName,
            creditCardNumber: req.body.creditCardNumber,
            ccv2: req.body.ccv2,
            expirationDate: req.body.expirationDate,
            userId: req.body.userId
        })
        await paymentMethod.save();
        res.status(201).json({
            status: "success",
            message: "Added Payement Method",
            method: paymentMethod
        });
    } catch (e) {
        res.status(500).json({ message: "server error" })
    }
}


const findPayementMethods=async (req,res)=>{
    try{
        const userId=req.params.id;
        const payments=await PaymentMethod.find({userId:userId});
        res.status(200).json({status:'success',methods:payments});
    }catch(e){
        res.status(400).json({status:'failed'});
    }
}

const deleteMethod=async(req,res)=>{
    try{
const methodId=req.params.id;
const method=await PaymentMethod.deleteOne({id:methodId});
res.status(200).json({
    status:"success",
    message:"Deleted successfully!"
})
    }catch(e){
        res.status(400).json({status:'failed'});

    }
}

module.exports = { addPaymentMethod,findPayementMethods,deleteMethod }