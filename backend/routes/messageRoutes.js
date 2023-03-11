const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const {
  sendMessage,
  getMessagesByConversation,
} = require("../controllers/messageController")

router.post("/send", withAuth, sendMessage)
router.get("/:conversationId", withAuth, getMessagesByConversation)

module.exports = router
