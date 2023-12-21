const Report = require("../models/ReportModel");
const Counter = require("../models/counterModel");

const addReport = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { id: "autovalReport" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
          );
      const report = new Report({
        id:counter.seq,
        reporterId:req.body.reporterId,
        reportedId:req.body.reportedId,
        reportContent:req.body.reportContent
      });
      await report.save()
      res.status(201).json({
        status: "success",
        message: "Sent Report",
        report:report
      });
      
  
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  
  }

module.exports = { addReport,}