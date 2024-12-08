const express = require("express");
const { getSchedules } = require("../controllers/trainerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

//router.get("/schedules", authMiddleware, getSchedules);
router.get("/schedules/:trainerId", getSchedules);

module.exports = router;