const mongoose = require("mongoose");


const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

module.exports = mongoose.model("Trainer", trainerSchema);
