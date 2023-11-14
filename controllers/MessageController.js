const Message = require("../models/messageModel");
const Counter=require("../models/counterModel")
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


const sendMessage = async (req, res) => {
  const { content, chatId,senderId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  const counter = await Counter.findOneAndUpdate(
    { id: "autovalmessage" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } 
  );
  var newMessage = {
    id:counter.seq,
    senderId: senderId,
    content: content,
    chatId: chatId,
  };

  try {
    var message = await Message.create(newMessage);


    res.status(201).json({status:"success",message:message});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };