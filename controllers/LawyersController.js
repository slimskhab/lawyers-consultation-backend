
const Review = require("../models/ReviewModel");
const Counter = require("../models/counterModel")
const Lawyer = require("../models/lawyerModel")
const bcrypt = require("bcrypt")
const addLawyer = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const lawyer = new Lawyer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      id: counter.seq,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.body.profilePic,
      category: req.body.category,
      certifPic: req.body.certifPic,
    });

    await lawyer.save();

    res.status(201).json({
      status: "success",
      message: "Added Lawyer",
      lawyer: lawyer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}
const loginLawyer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });



    if (!lawyer) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    if (lawyer.accountStatus === 0) {
      return res.status(401).json({
        status: "veriffail",
        message: "Account not verified",
      });
    }

    const passwordMatch = await bcrypt.compare(password, lawyer.password);

    if (passwordMatch) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        lawyer: lawyer,
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


const getOneLawyer = async (req, res) => {
  try {
    const id = req.params.id;

    const lawyer = await Lawyer.findOne({ id });

    if (!lawyer) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    } else {
      return res.status(200).json({
        status: "success",
        lawyer: lawyer
      })
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }

}

const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find({accountStatus:1});
    res.status(200).json({
      status: "success",
      lawyers: lawyers,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
}


const getTopLawyers = async (req, res) => {
  try {
      // Find all lawyers
      const lawyers = await Lawyer.find();

      // Calculate the average stars for each lawyer
      const lawyersWithAverageStars = await Promise.all(
          lawyers.map(async (lawyer) => {
              const reviews = await Review.find({ lawyerId: lawyer.id });
              const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
              const averageStars = reviews.length > 0 ? totalStars / reviews.length : 0;

              return {
                  ...lawyer.toObject(),
                  averageStars: averageStars,
              };
          })
      );

      // Sort lawyers by averageStars in descending order
      const topLawyers = lawyersWithAverageStars.sort((a, b) => b.averageStars - a.averageStars);

      const top3Lawyers = topLawyers.slice(0, 3);

        res.status(200).json({
            status: "success",
            topLawyers: top3Lawyers,
        });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Server Error!",
      });
  }
};



const getLawyerById = async (req, res) => {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ id: id })
    if (lawyer) {
      res.status(200).json({
        message: "success",
        lawyer: lawyer
      })
    } else {
      res.status(400).json({
        status: "failed",
        message: "lawyer doens't exist"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}
const getNotVerrifiedLawyers = async (req, res) => {
  try {

    const lawyers = await Lawyer.find({ accountStatus: 0 })
    if (lawyers) {
      res.status(200).json({
        message: "success",
        lawyers: lawyers
      })
    } else {
      res.status(400).json({
        status: "failed",
        message: "no lawyers found"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const lawyer = await Lawyer.findOne({ id: id })
    if (lawyer) {
      lawyer.accountStatus = status;
      await lawyer.save();
      res.status(200).json({
        message: "success",
        lawyer: lawyer
      })
    } else {
      res.status(400).json({
        status: "failed",
        message: "no lawyer found"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}


const addFunds = async (req, res) => {
  try {
    const id = req.params.id;
    const oldLawyer = await Lawyer.findOne({ id: id });
    if(oldLawyer){
      const newSolde=oldLawyer.funds+req.body.funds;
      const lawyer = await Lawyer.findOneAndUpdate({
        id: id
      }, {
        $set: {
          funds: newSolde
        }
      },{new:true})
      res.status(200).json({status:"success",lawyer:lawyer});
    }else{
      res.status(404).json({status:"failed",message:"lawyer doesn't exist"});

    }
    
  } catch (e) {
    res.status(500).json({status:"failed"});

  }
}


const withdrawMoney=async(req,res)=>{
  try{
    const lawyer=await Lawyer.findOneAndUpdate({id:req.body.userId},{$set:{
      funds:req.body.funds
    }},{new:true})

    res.status(200).json({status:"success",lawyer:lawyer})
  }catch(e){
    console.log(e);
    res.status(500).json({status:"failed"});
  }
}
module.exports = { addLawyer, addFunds,loginLawyer, getOneLawyer, getTopLawyers, getLawyerById, getAllLawyers, getNotVerrifiedLawyers, updateUser,withdrawMoney }