const multer = require("multer")

const storageProfilePictures = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/profilePictures")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const storagePostPictures = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/postPictures")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const uploadProfilePict = multer({ storage: storageProfilePictures })
const uploadPostPict = multer({ storage: storagePostPictures })

module.exports = { uploadProfilePict, uploadPostPict }
