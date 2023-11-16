const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const socket = require("socket.io");

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


const lawyersRouter = require("./routes/LawyerRoutes")
app.use("/lawyer", lawyersRouter)


const clientRouter = require("./routes/ClientRoutes")
app.use("/client", clientRouter)

const chatRouter = require("./routes/ChatRoutes")
app.use("/chat", chatRouter)

const messageRouter = require("./routes/MessageRoutes");
const Chat = require("./models/chatModel");
app.use("/message", messageRouter)

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  })


socket.on("typing",(room)=>
  socket.in(room).emit("typing")
)

socket.on("stop typing",(room)=>
  socket.in(room).emit("stop typing")
)

  socket.on("new message", async (newMessage) => {
    var chatId = newMessage.chatId;
    var chat = await Chat.findOne({ id: chatId });
    var user = chat.users.find((e) => e !== newMessage.senderId)
    socket.in(user).emit("message received", newMessage)
  })
})

