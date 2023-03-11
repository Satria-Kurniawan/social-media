const asyncHandler = require("express-async-handler")
const Account = require("../models/accountModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

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

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Account.find()

  res.status(200).json({ users })
})

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params

  // if (!mongoose.isValidObjectId(userId))
  //   return res.status(500).json(`No account with objectId ${userId}`)

  try {
    const user = await Account.findById(userId)

    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

const followOrUnfollow = asyncHandler(async (req, res) => {
  const { id } = req.params

  // if (!mongoose.isValidObjectId(id))
  //   return res.status(500).json(`No account with objectId ${id}`)

  const sourceAccount = await Account.findById(req.account._id)
  const destinationAccount = await Account.findById(id)

  const alreadyFollow = destinationAccount.followers.some(
    (f) => JSON.stringify(f.userId) === JSON.stringify(sourceAccount._id)
  )

  const sourceUserData = {
    userId: sourceAccount._id,
    userName: sourceAccount.name,
    userPict: sourceAccount.profilePict,
  }

  const destinationUserData = {
    userId: destinationAccount._id,
    userName: destinationAccount.name,
    userPict: destinationAccount.profilePict,
  }

  if (alreadyFollow) {
    await destinationAccount.updateOne({
      $pull: { followers: sourceUserData },
    })

    await sourceAccount.updateOne({
      $pull: { followings: destinationUserData },
    })

    res.status(200).json({ message: "Unfollowed" })
  } else {
    await destinationAccount.updateOne({
      $push: { followers: sourceUserData },
    })

    await sourceAccount.updateOne({
      $push: { followings: destinationUserData },
    })

    res.status(200).json({ message: "Followed" })
  }
})

const getFollowers = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findById(req.account._id)

    const followerList = await Promise.all(
      account.followers.map(({ userId }) => {
        return Account.findById(userId)
      })
    )

    let followers = []

    followerList.map((follower) => {
      followers.push({
        userId: follower._id,
        userName: follower.name,
        userPict: follower.profilePict,
      })
    })

    res.status(200).json({ followers })
  } catch (error) {
    res.status(500).json(error)
  }
})

const getFollowings = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findById(req.account._id)

    const followingList = await Promise.all(
      account.followings.map(({ userId }) => {
        return Account.findById(userId)
      })
    )

    let followings = []

    followingList.map((following) => {
      followings.push({
        userId: following._id,
        userName: following.name,
        userPict: following.profilePict,
      })
    })

    return res.status(200).json({ followings })
  } catch (error) {
    return res.status(500).json(error)
  }
})

const discoverPeople = asyncHandler(async (req, res) => {
  try {
    const discover = await Account.find({
      _id: { $ne: req.account._id },
      "followers.userId": { $ne: req.account._id },
    })

    res.status(200).json({ discover })
  } catch (error) {
    console.log(error)
  }
  // try {
  //   const account = await Account.findById(req.account._id)
  //   const users = await Account.find()

  //   // if (account.followings.length === users.length - 1)
  //   //   return res.status(500).json("Udah ke follow semua cuy.")

  //   let discoverPeople

  //   if (!account.followings.length) {
  //     discoverPeople = users.filter(({ _id }) => {
  //       return JSON.stringify(_id) !== JSON.stringify(account._id)
  //     })
  //   } else {
  //     account.followings.map(({ userId }) => {
  //       discoverPeople = users.filter(({ _id }) => {
  //         return JSON.stringify(_id) !== JSON.stringify(userId)
  //       })
  //     })

  //     discoverPeople = discoverPeople.filter(({ _id }) => {
  //       return JSON.stringify(_id) !== JSON.stringify(account._id)
  //     })
  //   }

  //   let discover = []

  //   discoverPeople.map((user) => {
  //     discover.push({
  //       userId: user._id,
  //       userName: user.name,
  //       userPict: user.profilePict,
  //     })
  //   })

  //   return res.status(200).json({ discover })
  // } catch (error) {
  //   return res.status(500).json(error)
  // }
})

module.exports = {
  signUp,
  signIn,
  profile,
  editProfile,
  getAllUsers,
  getUser,
  followOrUnfollow,
  getFollowers,
  getFollowings,
  discoverPeople,
}
