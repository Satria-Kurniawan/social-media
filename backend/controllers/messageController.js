const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")

const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId, senderId, text } = req.body

  try {
    const message = await Message.create({
      conversationId,
      senderId,
      text,
    })

    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
})

const getMessagesByConversation = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json
  }
})

module.exports = { sendMessage, getMessagesByConversation }
