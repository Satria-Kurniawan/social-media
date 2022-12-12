const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePict: {
    type: String,
    default: null,
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model("Account", accountSchema)
