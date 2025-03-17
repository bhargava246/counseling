const express = require("express")
const router = express.Router()
const {
  getSessions,
  getSessionById,
  createSession,
  updateSessionStatus,
  getStudentSessions,
  getCounselorSessions,
} = require("../controllers/sessionController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(protect, admin, getSessions).post(protect, createSession)
router.route("/:id").get(protect, getSessionById).put(protect, admin, updateSessionStatus)
router.route("/student").get(protect, getStudentSessions)
router.route("/counselor").get(protect, admin, getCounselorSessions)

module.exports = router

