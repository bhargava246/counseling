const express = require("express")
const router = express.Router()
const { protect, admin } = require("../middleware/authMiddleware")
const User = require("../models/userModel")

// @desc    Get all counselors
// @route   GET /api/counselors
// @access  Public
router.get("/", async (req, res) => {
  try {
    const counselors = await User.find({ role: "admin" }).select("-password")
    res.json(counselors)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router

