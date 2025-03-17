const asyncHandler = require("express-async-handler")
const Student = require("../models/studentModel")
const User = require("../models/userModel")

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}).populate("user", "name email")
  res.status(200).json(students)
})

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate("user", "name email")

  if (student) {
    res.status(200).json(student)
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id }).populate("user", "name email")

  if (student) {
    res.status(200).json(student)
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })

  if (student) {
    student.phone = req.body.phone || student.phone
    student.address = req.body.address || student.address
    student.city = req.body.city || student.city
    student.state = req.body.state || student.state
    student.zipCode = req.body.zipCode || student.zipCode
    student.bio = req.body.bio || student.bio
    student.school = req.body.school || student.school
    student.grade = req.body.grade || student.grade
    student.gpa = req.body.gpa || student.gpa

    if (req.body.marks) {
      student.marks.math = req.body.marks.math || student.marks.math
      student.marks.science = req.body.marks.science || student.marks.science
      student.marks.english = req.body.marks.english || student.marks.english
      student.marks.socialStudies = req.body.marks.socialStudies || student.marks.socialStudies
    }

    if (req.body.interests) {
      student.interests = req.body.interests
    }

    if (req.body.preferences) {
      student.preferences.programs = req.body.preferences.programs || student.preferences.programs
      student.preferences.locations = req.body.preferences.locations || student.preferences.locations
      student.preferences.collegeType = req.body.preferences.collegeType || student.preferences.collegeType
      student.preferences.budgetRange = req.body.preferences.budgetRange || student.preferences.budgetRange
      student.preferences.notes = req.body.preferences.notes || student.preferences.notes
    }

    const updatedStudent = await student.save()
    res.status(200).json(updatedStudent)
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

// @desc    Save college to student's saved colleges
// @route   POST /api/students/colleges/:id
// @access  Private
const saveCollege = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })
  const collegeId = req.params.id

  if (student) {
    // Check if college is already saved
    if (student.savedColleges.includes(collegeId)) {
      res.status(400)
      throw new Error("College already saved")
    }

    student.savedColleges.push(collegeId)
    await student.save()
    res.status(200).json({ message: "College saved" })
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

// @desc    Remove college from student's saved colleges
// @route   DELETE /api/students/colleges/:id
// @access  Private
const removeSavedCollege = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })
  const collegeId = req.params.id

  if (student) {
    student.savedColleges = student.savedColleges.filter((id) => id.toString() !== collegeId)
    await student.save()
    res.status(200).json({ message: "College removed" })
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

// @desc    Get student's saved colleges
// @route   GET /api/students/colleges
// @access  Private
const getSavedColleges = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id }).populate("savedColleges")

  if (student) {
    res.status(200).json(student.savedColleges)
  } else {
    res.status(404)
    throw new Error("Student not found")
  }
})

module.exports = {
  getStudents,
  getStudentById,
  getStudentProfile,
  updateStudentProfile,
  saveCollege,
  removeSavedCollege,
  getSavedColleges,
}

