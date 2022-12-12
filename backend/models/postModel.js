const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    caption: {
      type: String,
      default: null,
      max: 400,
    },
    location: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      default: null,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Post", postSchema)
