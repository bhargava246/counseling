const express = require("express")
const router = express.Router()
const {
  getStudents,
  getStudentById,
  getStudentProfile,
  updateStudentProfile,
  saveCollege,
  removeSavedCollege,
  getSavedColleges,
} = require("../controllers/studentController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(protect, admin, getStudents)
router.route("/profile").get(protect, getStudentProfile).put(protect, updateStudentProfile)
router.route("/:id").get(protect, admin, getStudentById)
router.route("/colleges").get(protect, getSavedColleges)
router.route("/colleges/:id").post(protect, saveCollege).delete(protect, removeSavedCollege)

module.exports = router

