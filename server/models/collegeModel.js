const mongoose = require("mongoose")

const collegeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    type: {
      type: String,
      required: [true, "Please add a type"],
      enum: ["University", "College", "Institute", "School", "Academy"],
    },
    cutoffMarks: {
      type: Number,
      required: [true, "Please add cutoff marks"],
    },
    programs: {
      type: [String],
      required: [true, "Please add programs"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    website: {
      type: String,
      required: [true, "Please add a website"],
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("College", collegeSchema)

