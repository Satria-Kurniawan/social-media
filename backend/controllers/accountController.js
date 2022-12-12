const asyncHandler = require("express-async-handler")
const Account = require("../models/accountModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })
}

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please input all fields!")
  }

  const accountExists = await Account.findOne({ email })

  if (accountExists) {
    res.status(400)
    throw new Error("Account already exists.")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const account = await Account.create({
    name,
    email,
    password: hashedPassword,
  })

  if (!account) {
    res.status(400)
    throw new Error("Invalid account data.")
  }

  res.status(201).json({
    _id: account.id,
    name: account.name,
    email: account.email,
    accessToken: generateToken(account._id),
  })
})

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please input all fields")
  }

  const account = await Account.findOne({ email })

  if (account && (await bcrypt.compare(password, account.password))) {
    res.status(200).json({
      _id: account._id,
      name: account.name,
      email: account.email,
      profilePict: account.profilePict,
      followers: account.followers,
      followings: account.followings,
      accessToken: generateToken(account._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials.")
  }
})

const profile = asyncHandler(async (req, res) => {
  res.status(200).json(req.account)
})

const editProfile = asyncHandler(async (req, res) => {
  const newName = req.body.name ? req.body.name : req.account.name
  const newProfilePict = req.file ? req.file.filename : req.account.profilePict

  const account = await Account.findByIdAndUpdate(
    req.account._id,
    {
      name: newName,
      profilePict: newProfilePict,
    },
    { new: true }
  )

  res.status(200).json({
    message: "Profile updated.",
    account,
  })
})

module.exports = { signUp, signIn, profile, editProfile }
