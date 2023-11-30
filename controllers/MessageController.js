const Message = require("../models/messageModel");
const Counter = require("../models/counterModel");
const Chat = require("../models/chatModel");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.id }).sort({ updatedAt: 'asc' }); // or 'desc' for descending order
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


const sendMessage = async (req, res) => {
  const { content, chatId, senderId, isContract, contractStartDate, contractEndDate, contractFee, contractStatus } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  await Chat.findOneAndUpdate({
    id: chatId
  }, {
    $set: {
      latestMessage: content
    }
  })

  const counter = await Counter.findOneAndUpdate(
    { id: "autovalmessage" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  var newMessage;
  if (isContract) {
    newMessage = {
      id: counter.seq,
      senderId: senderId,
      content: content,
      chatId: chatId,
      isContract: isContract,
      contractEndDate: contractEndDate,
      contractFee: contractFee,
      contractStartDate: contractStartDate,
      contractStatus: contractStatus,
      isAccepted: false,
    }
  } else {
    newMessage = {
      id: counter.seq,
      senderId: senderId,
      content: content,
      chatId: chatId,
    };
  }

  try {
    var message = await Message.create(newMessage);


    res.status(201).json({ status: "success", message: message });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


const changeContractStatus = async (req, res) => {
  const { messageId, contractStatus ,contractStartDate,contractEndDate,contractFee } = req.body;
  try {
    const updatedMessage = await Message.findOneAndUpdate({
      id: messageId
    }, {
      $set: {
        contractStatus: contractStatus,
        contractStartDate:contractStartDate,
        contractEndDate:contractEndDate,
        contractFee:contractFee
      }
    }, { new: true })


    res.status(200).json({
      status: "success",
      message: updatedMessage,
    })
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: "server error!",
    })
  }

};

const deleteMessage=async (req, res) => {
  const messageId = Number(req.params.id);
  try {
    const deletedMessage = await Message.findOneAndDelete({id:messageId});
    if (deletedMessage) {
      res.status(200).json({ message: 'Message deleted successfully', deletedMessage });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const getContracts=async (req, res) => {
  try {
    const chatId=req.params.id;
    const contracts = await Message.find({chatId:chatId,isContract:true,contractStatus:2});
      res.status(200).json({ status: 'Success', contracts:contracts });
   
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

module.exports = { allMessages, sendMessage, changeContractStatus,deleteMessage,getContracts };