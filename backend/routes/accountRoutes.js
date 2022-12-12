const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const {
  signUp,
  signIn,
  profile,
  editProfile,
} = require("../controllers/accountController")
const { uploadProfilePict } = require("../middleware/fileUpload")

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/profile", withAuth, profile)
router.put(
  "/edit/profile",
  [withAuth, uploadProfilePict.single("profilePict")],
  editProfile
)

module.exports = router
