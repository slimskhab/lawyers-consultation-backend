const Review = require("../models/ReviewModel");
const Counter = require("../models/counterModel");

const addReview=async (req,res)=>{
    try{

        const counter = await Counter.findOneAndUpdate(
            { id: "autovalReview" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
          );
        const review=new Review({
            id:counter.seq,
            clientId:req.body.clientId,
            lawyerId:req.body.lawyerId,
            stars:req.body.stars,
            comment:req.body.comment
        })
        await review.save()
        res.status(201).json({status:'success',review:review});
    }catch(e){
        console.log(e);
        res.status(500).json({status:'failed',message:"Server Error!"});
    }
}

const getLawyerReview=async (req,res)=>{
    try{
        const lawyerId=req.params.id;
const reviews=await Review.find({
    lawyerId:lawyerId
})
res.status(200).json({status:'success',reviews:reviews});

    }catch(e){
        res.status(500).json({status:'failed',message:"Server Error!"});

    }
}

const getAvgLawyerReview = async (req, res) => {
    try {
        const lawyerId = req.params.id;

        // Find all reviews for the specified lawyerId
        const reviews = await Review.find({ lawyerId: lawyerId });

        // Calculate the average of stars
        let totalStars = 0;
        reviews.forEach(review => {
            totalStars += review.stars;
        });

        const averageStars = reviews.length > 0 ? totalStars / reviews.length : 0;

        // Send the response with the averageStars included
        res.status(200).json({ status: 'success', averageStars: averageStars });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 'failed', message: 'Server Error!' });
    }
}

module.exports={addReview,getLawyerReview,getAvgLawyerReview}