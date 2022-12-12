const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Account = require("../models/accountModel")

const withAuth = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.account = await Account.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Unauthorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Unauthorized, no token")
  }
})

module.exports = { withAuth }
