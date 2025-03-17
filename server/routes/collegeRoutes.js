const express = require("express")
const router = express.Router()
const {
  getColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
  getRecommendedColleges,
} = require("../controllers/collegeController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(getColleges).post(protect, admin, createCollege)
router.route("/recommendations").get(protect, getRecommendedColleges)
router.route("/:id").get(getCollegeById).put(protect, admin, updateCollege).delete(protect, admin, deleteCollege)

module.exports = router

