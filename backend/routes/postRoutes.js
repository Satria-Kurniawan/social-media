const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const { uploadPostPict } = require("../middleware/fileUpload")
const { createPost, getPosts } = require("../controllers/postController")

router.post("/create", [withAuth, uploadPostPict.single("picture")], createPost)
router.get("/all", withAuth, getPosts)

module.exports = router
