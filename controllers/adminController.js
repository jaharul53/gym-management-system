const Trainer = require("../models/Trainer");
const Class = require("../models/Class");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // To read from .env file

const createTrainer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const trainer = await Trainer.create({ name, email });
    res.status(201).json({ success: true, data: trainer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const scheduleClass = async (req, res) => {
  try {
    const { date, time, trainerId } = req.body;

    // Validate input
    if (!date || !time || !trainerId) {
      return res.status(400).json({
        success: false,
        message: "Date, time, and trainer ID are required.",
      });
    }

    // Check if the trainer exists
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }

    // Check if the date has already reached the maximum schedule limit
    const classesOnDate = await Class.find({ date });
    if (classesOnDate.length >= 5) {
      return res.status(400).json({
        success: false,
        message:
          "Daily schedule limit reached. Maximum of 5 classes allowed per day.",
      });
    }

    // Check if the time slot is already occupied
    const existingClass = await Class.findOne({ date, time });
    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "A class is already scheduled for this time slot.",
      });
    }

    // Schedule the new class
    const newClass = await Class.create({
      date,
      time,
      trainer: trainerId,
      trainees: [],
      maxTrainees: 10,
    });

    res.status(201).json({
      success: true,
      message: "Class scheduled successfully.",
      data: newClass,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if the provided email and password match the ones in .env
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // In real-world cases, you should hash the password in your .env, or compare it to a hashed password from the database
    const isPasswordValid = password === process.env.ADMIN_PASS;

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate JWT token if login is successful
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL }, // Payload (you can add more info like user ID if needed)
      process.env.JWT_SECRET, // Secret key (should be stored in .env)
      { expiresIn: '1h' } // Token expiration time (1 hour in this case)
    );

    // Return the token in the response
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token, // Return the generated JWT token
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createTrainer, scheduleClass,adminLogin };
