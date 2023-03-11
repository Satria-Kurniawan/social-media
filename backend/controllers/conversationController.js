const asyncHandler = require("express-async-handler")
const Conversation = require("../models/conversationModel")

const newConversation = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body

  try {
    const conversation = await Conversation.create({
      members: [senderId, receiverId],
    })

    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error)
  }
})

const getConversationByUser = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    })

    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = { newConversation, getConversationByUser }
