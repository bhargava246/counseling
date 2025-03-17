const asyncHandler = require("express-async-handler")
const Session = require("../models/sessionModel")
const Student = require("../models/studentModel")

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Private/Admin
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({}).populate("student", "user").populate("counselor", "name email")

  res.status(200).json(sessions)
})

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Private
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id).populate("student", "user").populate("counselor", "name email")

  // Check if session exists
  if (!session) {
    res.status(404)
    throw new Error("Session not found")
  }

  // Check if user is admin or the student associated with the session
  const student = await Student.findById(session.student)

  if (req.user.role !== "admin" && student.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("Not authorized")
  }

  res.status(200).json(session)
})

// @desc    Create a session
// @route   POST /api/sessions
// @access  Private
const createSession = asyncHandler(async (req, res) => {
  const { counselor, date, time, duration, topic, notes } = req.body

  // Get student ID from user ID
  const student = await Student.findOne({ user: req.user._id })

  if (!student) {
    res.status(404)
    throw new Error("Student not found")
  }

  const session = await Session.create({
    student: student._id,
    counselor,
    date,
    time,
    duration,
    topic,
    notes,
    status: "Pending",
  })

  res.status(201).json(session)
})

// @desc    Update session status
// @route   PUT /api/sessions/:id
// @access  Private/Admin
const updateSessionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body

  const session = await Session.findById(req.params.id)

  if (session) {
    session.status = status || session.status

    const updatedSession = await session.save()
    res.status(200).json(updatedSession)
  } else {
    res.status(404)
    throw new Error("Session not found")
  }
})

// @desc    Get student's sessions
// @route   GET /api/sessions/student
// @access  Private
const getStudentSessions = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })

  if (!student) {
    res.status(404)
    throw new Error("Student not found")
  }

  const sessions = await Session.find({ student: student._id }).populate("counselor", "name email").sort({ date: 1 })

  res.status(200).json(sessions)
})

// @desc    Get counselor's sessions
// @route   GET /api/sessions/counselor
// @access  Private/Admin
const getCounselorSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ counselor: req.user._id })
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .sort({ date: 1 })

  res.status(200).json(sessions)
})

module.exports = {
  getSessions,
  getSessionById,
  createSession,
  updateSessionStatus,
  getStudentSessions,
  getCounselorSessions,
}

