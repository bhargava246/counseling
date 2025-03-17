const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    counselor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    time: {
      type: String,
      required: [true, "Please add a time"],
    },
    duration: {
      type: String,
      required: [true, "Please add a duration"],
    },
    topic: {
      type: String,
      required: [true, "Please add a topic"],
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Session", sessionSchema)

