const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer", // Reference to the Trainer model
        required: true,
    },
    trainees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainee", // Reference to the Trainee model
        },
    ],
    maxTrainees: {
        type: Number,
        default: 10,
    },
});

module.exports = mongoose.model("Class", classSchema);