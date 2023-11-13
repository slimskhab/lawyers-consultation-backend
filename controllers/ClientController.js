
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
          message:"Added Client!"
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
                client: {
                    id: client.id,
                    firstName: client.firstName,
                    lastName:client.lastName,
                    email: client.email,
                },
            });
        } else {
            res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error!",
        });
    }

}
  module.exports={addClient,loginClient}