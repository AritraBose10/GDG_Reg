// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://aritraboselm10:Aritra2003@cluster0.u4hbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// Define a schema and model for registration data
const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  contactNumber: { type: String, unique: true },
  collegeId: { type: String, unique: true },
  yearOfStudy: String,
  batch: String,
  pastMember: String,
  skills: [{ skill: String, level: String }],
  roles: String,
  portfolio: String,
  reason: String,
  commitment: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(cors());
app.use(bodyParser.json());

// Check for existing records
app.post("/check-existing", async (req, res) => {
  const { email, contactNumber, collegeId } = req.body;

  try {
    // Check if the email, contactNumber, or collegeId already exists in the database
    const emailExists = await Registration.exists({ email });
    const contactExists = await Registration.exists({ contactNumber });
    const collegeIdExists = await Registration.exists({ collegeId });

    if (emailExists || contactExists || collegeIdExists) {
      // Return 400 status if any of them exist
      return res
        .status(400)
        .json({ emailExists, contactExists, collegeIdExists });
    }

    // If none exist, return a success response
    return res
      .status(200)
      .json({ message: "No conflicts, proceed with registration." });
  } catch (error) {
    // If something goes wrong on the server, return 500
    return res.status(500).json({ error: "Server error" });
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    collegeId,
    yearOfStudy,
    batch,
    pastMember,
    skills,
    roles,
    portfolio,
    reason,
    commitment,
  } = req.body;

  try {
    // Create a new registration document
    const registration = new Registration({
      fullName,
      email,
      contactNumber,
      collegeId,
      yearOfStudy,
      batch,
      pastMember,
      skills,
      roles,
      portfolio,
      reason,
      commitment,
    });

    // Save to database
    await registration.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({
        error: "Email, contact number, or college ID already exists",
      });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
