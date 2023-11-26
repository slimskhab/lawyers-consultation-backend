
const Counter=require("../models/counterModel")
const Lawyer=require("../models/lawyerModel")
const bcrypt=require("bcrypt")
const addLawyer=async (req, res) => {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } 
      );

      const hashedPassword=await bcrypt.hash(req.body.password,10);
      const lawyer = new Lawyer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio:req.body.bio,
        id: counter.seq,
        email:req.body.email,
        password:hashedPassword,
        profilePic:req.body.profilePic,
        category:req.body.category,
      });
  
      await lawyer.save();
  
      res.status(201).json({
        status:"success",
          message:"Added Lawyer",
          lawyer:lawyer
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

        const lawyer = await Lawyer.findOne({ email });
      


        if (!lawyer) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        if (lawyer.accountStatus===0) {
          return res.status(401).json({
              status: "fail",
              message: "Account not verified",
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
                    profilePic:lawyer.profilePic,
                    category:lawyer.category
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


const getOneLawyer=async (req,res)=>{
  try {
      const id = req.params.id;

      const lawyer = await Lawyer.findOne({ id });

      if (!lawyer) {
          return res.status(401).json({
              status: "fail",
              message: "Invalid email or password",
          });
      }else{
        return res.status(200).json({
          status:"success",
          lawyer:lawyer
        })
      }

     
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Server Error!",
      });
  }

}

const getAllLawyers=async(req,res)=>{
  try{
    const lawyers= await Lawyer.find();
    res.status(200).json({
      status: "success",
      lawyers: lawyers,
    });
  }catch(e){
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
}


const getTopLawyers = async (req, res) => {
  try {
    const topLawyers = await Lawyer.find({rating:{$exists:true}}).sort({ reviews: -1 }).limit(req.body.limit);

    res.status(200).json({
      status: "success",
      lawyers: topLawyers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};


const getLawyerById=async (req, res) => {
  try {
    const id = req.params.id;
    const lawyer=await Lawyer.findOne({id:id})
    if(lawyer){
      res.status(200).json({
        message:"success",
        lawyer:lawyer
      })
    }else{
      res.status(400).json({
        status:"failed",
          message:"lawyer doens't exist"
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message:"Server Error!"
    });
  }
}
const getNotVerrifiedLawyers=async (req, res) => {
  try {
 
    const lawyers=await Lawyer.find({accountStatus:0})
    if(lawyers){
      res.status(200).json({
        message:"success",
        lawyers:lawyers
      })
    }else{
      res.status(400).json({
        status:"failed",
          message:"no lawyers found"
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message:"Server Error!"
    });
  }
}

const updateUser=async (req, res) => {
  try {
    const id=req.params.id;
    const status=req.body.status;
    const lawyer=await Lawyer.findOne({id:id})
    if(lawyer){
      lawyer.accountStatus=status;
      await lawyer.save();
      res.status(200).json({
        message:"success",
        lawyer:lawyer
      })
    }else{
      res.status(400).json({
        status:"failed",
          message:"no lawyer found"
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message:"Server Error!"
    });
  }
}
  module.exports={addLawyer,loginLawyer,getOneLawyer,getTopLawyers,getLawyerById,getAllLawyers,getNotVerrifiedLawyers,updateUser}