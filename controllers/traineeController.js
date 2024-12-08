const Class = require("../models/Class");
const Trainee = require("../models/Trainee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const traineeLogin = async (req, res) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the trainee by email in the database
    const trainee = await Trainee.findOne({ email });

    // If the trainee does not exist, return an error
    if (!trainee) {
      return res.status(400).json({
        success: false,
        message: "Trainee not found. Please check the email and try again.",
      });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, trainee.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // Generate a JWT token if login is successful
    const token = jwt.sign(
      { traineeId: trainee._id, email: trainee.email }, // Payload
      process.env.JWT_SECRET, // Secret key (use your own secret in .env)
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Send the token in the response
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token, // Send back the JWT token
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new Trainee Profile
const createTrainee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if trainee already exists
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({
        success: false,
        message: "Trainee already exists with this email.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new trainee
    const trainee = await Trainee.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Trainee profile created successfully.",
      data: trainee,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Trainee Profile
const updateTrainee = async (req, res) => {
  try {
    const { name, email, traineeId } = req.body;

    // Find the trainee by ID
    const trainee = await Trainee.findById(traineeId);
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: "Trainee not found.",
      });
    }

    // Update the trainee's profile
    trainee.name = name;
    trainee.email = email;

    // Save the updated profile
    await trainee.save();

    res.status(200).json({
      success: true,
      message: "Trainee profile updated successfully.",
      data: trainee,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Trainee Profile
const getTrainee = async (req, res) => {
  try {
    const traineeId = req.user.id; // Assuming the authenticated user's ID is in req.user

    // Find the trainee by ID
    const trainee = await Trainee.findById(traineeId);
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: "Trainee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainee profile fetched successfully.",
      data: trainee,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const bookClass = async (req, res) => {
  try {
    const { classId, traineeId } = req.body;

    // Validate input
    if (!classId || !traineeId) {
      return res.status(400).json({
        success: false,
        message: "Class ID and Trainee ID are required.",
      });
    }

    // Check if the class exists
    const gymClass = await Class.findById(classId);
    if (!gymClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    // Check if the class is full
    if (gymClass.trainees.length >= gymClass.maxTrainees) {
      return res.status(400).json({
        success: false,
        message:
          "Class schedule is full. Maximum 10 trainees allowed per schedule.",
      });
    }

    // Check if the trainee already booked this class
    if (gymClass.trainees.includes(traineeId)) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this class.",
      });
    }

    // Add the trainee to the class
    gymClass.trainees.push(traineeId);
    await gymClass.save();

    // Fetch the trainee and add the class to the trainee's booked classes
    const trainee = await Trainee.findById(traineeId);
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: "Trainee not found.",
      });
    }

    // Add the class to the trainee's booked classes
    trainee.classes.push(gymClass._id);
    await trainee.save();

    res.status(200).json({
      success: true,
      message: "Class booked successfully.",
      data: {
        trainee: trainee,
        classes: gymClass,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTraineeClasses = async (req, res) => {
  try {
    const { traineeId } = req.params; // Get the trainee ID from request parameters

    // Fetch the trainee by ID and populate the 'classes' field with class details
    const trainee = await Trainee.findById(traineeId).populate("classes"); // populate will join the Class data

    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: "Trainee not found.",
      });
    }

    // Return the classes the trainee has booked
    res.status(200).json({
      success: true,
      message: "Trainee classes retrieved successfully.",
      data: trainee.classes, // The classes array will contain the class details
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTrainee,
  updateTrainee,
  getTrainee,
  bookClass,
  getTraineeClasses,
  traineeLogin
};
