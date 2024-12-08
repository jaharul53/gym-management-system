const express = require("express");
const {
  bookClass,
  createTrainee,
  getTraineeClasses,
  updateTrainee,
  traineeLogin
} = require("../controllers/traineeController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

//router.post("/book-class", authMiddleware, bookClass);
router.post('/login', traineeLogin);
router.post("/book-class", authMiddleware, bookClass);
router.post("/signup", createTrainee);
router.post("/update-trainee", authMiddleware, updateTrainee);
router.get("/getClasses/:traineeId", authMiddleware, getTraineeClasses);

module.exports = router;
