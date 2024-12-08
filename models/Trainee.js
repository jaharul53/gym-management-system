const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

module.exports = mongoose.model("Trainee", traineeSchema);
