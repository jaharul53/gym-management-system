const express = require("express");

const {
  createTrainer,
  scheduleClass,
  adminLogin,
} = require("../controllers/adminController"); 

const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);
router.post("/create-trainer", authMiddleware, createTrainer);
router.post("/schedule-class",authMiddleware, scheduleClass);


module.exports = router;
