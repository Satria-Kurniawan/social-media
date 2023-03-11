const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
