const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const cors = require("cors")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
const path = require("path")

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/students", require("./routes/studentRoutes"))
app.use("/api/counselors", require("./routes/counselorRoutes"))
app.use("/api/sessions", require("./routes/sessionRoutes"))
app.use("/api/colleges", require("./routes/collegeRoutes"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold)
})

