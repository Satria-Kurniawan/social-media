const express = require("express")
const router = express.Router()
const { withAuth } = require("../middleware/withAuth")
const {
  signUp,
  signIn,
  profile,
  editProfile,
  getAllUsers,
  followOrUnfollow,
  getFollowers,
  getFollowings,
  discoverPeople,
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
router.get("/all", withAuth, getAllUsers)
router.patch("/follow/:id", withAuth, followOrUnfollow)
router.get("/followers", withAuth, getFollowers)
router.get("/followings", withAuth, getFollowings)
router.get("/discover", withAuth, discoverPeople)

module.exports = router
