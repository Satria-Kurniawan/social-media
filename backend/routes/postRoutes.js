const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const { uploadPostPict } = require("../middleware/fileUpload")
const {
  createPost,
  getPosts,
  likeOrDislikePost,
} = require("../controllers/postController")

router.post("/create", [withAuth, uploadPostPict.single("picture")], createPost)
router.get("/all", withAuth, getPosts)
router.patch("/like/:id", withAuth, likeOrDislikePost)

module.exports = router
