const express=require("express");
const app= express();
const mongoose=require("mongoose");
const cors = require('cors');
const dotenv=require("dotenv")
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DBURI);

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
db.once('open', () => {
    console.log('Connected to MongoDB');
  });


const lawyersRouter=require("./routes/LawyerRoutes")
app.use("/lawyer",lawyersRouter)


const clientRouter=require("./routes/ClientRoutes")
app.use("/client",clientRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})