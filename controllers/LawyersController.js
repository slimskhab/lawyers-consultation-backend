
const Counter=require("../models/counterModel")
const Laywer=require("../models/lawyerModel")
const bcrypt=require("bcrypt")
const addLawyer=async (req, res) => {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } 
      );

      const hashedPassword=await bcrypt.hash(req.body.password,10);
      const lawyer = new Laywer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio:req.body.bio,
        id: counter.seq,
        email:req.body.email,
        password:hashedPassword,
      });
  
      await lawyer.save();
  
      res.status(201).json({
        status:"success",
          message:"Added Lawyer"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
          message:"Server Error!"
      });
    }
  }
const loginLawyer=async (req,res)=>{
    try {
        const { email, password } = req.body;

        const lawyer = await Laywer.findOne({ email });

        if (!lawyer) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, lawyer.password);

        if (passwordMatch) {
            res.status(200).json({
                status: "success",
                message: "Login successful",
                lawyer: {
                    id: lawyer.id,
                    firstName: lawyer.firstName,
                    lastName:lawyer.lastName,
                    email: lawyer.email,
                    bio:lawyer.bio,
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
  module.exports={addLawyer,loginLawyer}