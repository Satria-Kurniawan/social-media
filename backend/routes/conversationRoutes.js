const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const {
  newConversation,
  getConversationByUser,
} = require("../controllers/conversationController")

router.post("/new", withAuth, newConversation)
router.get("/:userId", withAuth, getConversationByUser)

module.exports = router
