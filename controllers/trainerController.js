const Class = require("../models/Class");
const Trainer = require("../models/Trainer");

const getSchedules = async (req, res) => {
  try {
    const trainerId = req.params.trainerId; // Assuming trainer ID is provided in the URL

    // Validate the trainer ID
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }

    // Fetch all schedules where the trainer is assigned
    const schedules = await Class.find({ trainer: trainerId }).populate('trainer', 'name email');
    
    if (schedules.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schedules found for this trainer.",
      });
    }

    // Return the trainer's schedules
    res.status(200).json({
      success: true,
      message: "Schedules fetched successfully.",
      data: schedules,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



module.exports = { getSchedules };


