const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")

const createPost = asyncHandler(async (req, res) => {
  const { caption, location } = req.body

  if (!caption && !req.file) {
    res.status(400)
    throw new Error("Post cannot be empty.")
  }

  const pictureName = req.file?.filename

  try {
    let post = await Post.create({
      user: req.account._id,
      caption,
      location,
      picture: pictureName,
    })

    post = await post.populate("user")

    res.status(201).json({
      message: "Post created.",
      post,
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user")

  res.status(200).json({ posts })
})

module.exports = { createPost, getPosts }
