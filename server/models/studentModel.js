const mongoose = require("mongoose")

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    school: {
      type: String,
      default: "",
    },
    grade: {
      type: String,
      default: "",
    },
    gpa: {
      type: Number,
      default: 0,
    },
    marks: {
      math: { type: Number, default: 0 },
      science: { type: Number, default: 0 },
      english: { type: Number, default: 0 },
      socialStudies: { type: Number, default: 0 },
    },
    interests: {
      type: [String],
      default: [],
    },
    preferences: {
      programs: { type: [String], default: [] },
      locations: { type: [String], default: [] },
      collegeType: { type: String, default: "" },
      budgetRange: { type: String, default: "" },
      notes: { type: String, default: "" },
    },
    savedColleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Student", studentSchema)

