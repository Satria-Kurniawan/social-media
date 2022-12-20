const asyncHandler = require("express-async-handler")
const { default: mongoose } = require("mongoose")
const Post = require("../models/postModel")
const Account = require("../models/accountModel")

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

const likeOrDislikePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id))
    return res.status(404).send(`No post with objectId ${id}`)

  try {
    const post = await Post.findById(id)
    const account = await Account.findById(req.account._id)

    let isLiked

    post.likes?.forEach((element) => {
      if (JSON.stringify(element.userId) === JSON.stringify(req.account._id)) {
        isLiked = true
        return
      }
    })

    const userData = {
      userId: account._id,
      userName: account.name,
      userPict: account.profilePict,
    }

    if (!isLiked) {
      await post.updateOne({
        $push: {
          likes: userData,
        },
      })
      res.status(200).json({ message: "Post liked.", userData })
    } else {
      await post.updateOne({
        $pull: {
          likes: userData,
        },
      })
      res.status(200).json({ message: "Post disliked.", userData })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { createPost, getPosts, likeOrDislikePost }
