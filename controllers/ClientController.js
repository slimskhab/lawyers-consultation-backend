
const Counter=require("../models/counterModel")
const Client=require("../models/clientModel")
const bcrypt=require("bcrypt")
const addClient=async (req, res) => {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } 
      );

      const hashedPassword=await bcrypt.hash(req.body.password,10);
      const client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: counter.seq,
        email:req.body.email,
        password:hashedPassword,
      });
  
      await client.save();
  
      res.status(201).json({
        status:"success",
          message:"Added Client!",
          client:client
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
          message:"Server Error!"
      });
    }
  }
const loginClient=async (req,res)=>{
    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, client.password);

        if (passwordMatch) {
            res.status(200).json({
                status: "success",
                message: "Login successful",
                client: client,
            });
        } else {
            res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error!",
        });
    }

}


const getClientById=async (req, res) => {
  try {
    const id = req.params.id;
    const client=await Client.findOne({id:id})
    if(client){
      res.status(200).json({
        message:"success",
        client:client
      })
    }else{
      console.log("failed");
      res.status(400).json({
        status:"failed",
          message:"client doens't exist"
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message:"Server Error!"
    });
  }
}
const addFunds = async (req, res) => {
  try {
    const id = req.params.id;
    const oldClient = await Client.findOne({ id: id });
    if(oldClient){
      const newSolde=oldClient.funds+req.body.funds;
      const client = await Client.findOneAndUpdate({
        id: id
      }, {
        $set: {
          funds: newSolde
        }
      },{new:true})
      res.status(200).json({status:"success",client:client});
    }else{
      res.status(404).json({status:"failed",message:"client doesn't exist"});

    }
    
  } catch (e) {
    res.status(500).json({status:"failed"});

  }
}

const setFunds=async(req,res)=>{
  try{
const client=await Client.findOneAndUpdate({id:req.body.userId},{$set:{
  funds:req.body.funds
}},{new:true})
res.status(200).json({status:"success",client:client})
  }catch(e){
    res.status(500).json({status:"failed",message:"Server Error"})

  }
}

  module.exports={addClient,loginClient,getClientById,addFunds,setFunds}