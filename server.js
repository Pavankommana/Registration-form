const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (make sure MongoDB is running locally)
mongoose.connect("mongodb://127.0.0.1:27017/internshipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// Schema
const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  course: String,
  year: String,
  skills: String,
});

const Student = mongoose.model("Student", studentSchema);

// API to save form data
app.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data", error: err });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
