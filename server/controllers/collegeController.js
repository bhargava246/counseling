const asyncHandler = require("express-async-handler")
const College = require("../models/collegeModel")
const Student = require("../models/studentModel")

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
const getColleges = asyncHandler(async (req, res) => {
  const colleges = await College.find({})
  res.status(200).json(colleges)
})

// @desc    Get college by ID
// @route   GET /api/colleges/:id
// @access  Public
const getCollegeById = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id)

  if (college) {
    res.status(200).json(college)
  } else {
    res.status(404)
    throw new Error("College not found")
  }
})

// @desc    Create a college
// @route   POST /api/colleges
// @access  Private/Admin
const createCollege = asyncHandler(async (req, res) => {
  const { name, location, type, cutoffMarks, programs, description, website } = req.body

  const college = await College.create({
    name,
    location,
    type,
    cutoffMarks,
    programs,
    description,
    website,
  })

  res.status(201).json(college)
})

// @desc    Update a college
// @route   PUT /api/colleges/:id
// @access  Private/Admin
const updateCollege = asyncHandler(async (req, res) => {
  const { name, location, type, cutoffMarks, programs, description, website } = req.body

  const college = await College.findById(req.params.id)

  if (college) {
    college.name = name || college.name
    college.location = location || college.location
    college.type = type || college.type
    college.cutoffMarks = cutoffMarks || college.cutoffMarks
    college.programs = programs || college.programs
    college.description = description || college.description
    college.website = website || college.website

    const updatedCollege = await college.save()
    res.status(200).json(updatedCollege)
  } else {
    res.status(404)
    throw new Error("College not found")
  }
})

// @desc    Delete a college
// @route   DELETE /api/colleges/:id
// @access  Private/Admin
const deleteCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id)

  if (college) {
    await college.deleteOne()
    res.status(200).json({ message: "College removed" })
  } else {
    res.status(404)
    throw new Error("College not found")
  }
})

// @desc    Get recommended colleges for a student
// @route   GET /api/colleges/recommendations
// @access  Private
const getRecommendedColleges = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })

  if (!student) {
    res.status(404)
    throw new Error("Student not found")
  }

  // Calculate average marks
  const marks = student.marks
  const avgMarks = (marks.math + marks.science + marks.english + marks.socialStudies) / 4

  // Get colleges with cutoff marks less than or equal to student's average marks
  const colleges = await College.find({ cutoffMarks: { $lte: avgMarks } })

  // Calculate match score for each college
  const recommendedColleges = colleges.map((college) => {
    // Base match score based on cutoff marks
    let matchScore = 100 - ((avgMarks - college.cutoffMarks) / avgMarks) * 100

    // Adjust match score based on student preferences
    if (student.preferences.collegeType && college.type === student.preferences.collegeType) {
      matchScore += 10
    }

    // Check if any of the student's interests match the college's programs
    const programMatch = student.interests.some((interest) =>
      college.programs.some((program) => program.toLowerCase().includes(interest.toLowerCase())),
    )

    if (programMatch) {
      matchScore += 10
    }

    // Ensure match score is between 0 and 100
    matchScore = Math.min(Math.max(matchScore, 0), 100)

    return {
      ...college.toObject(),
      matchScore: Math.round(matchScore),
    }
  })

  // Sort by match score (highest first)
  recommendedColleges.sort((a, b) => b.matchScore - a.matchScore)

  res.status(200).json(recommendedColleges)
})

module.exports = {
  getColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
  getRecommendedColleges,
}

