const mongoose = require('mongoose');

const position = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "the Name is required "],
  },
  Description: {
    type: String,
    required: [true, "the Description is required "],
  },
  Skills: {
    type: [String], // Change to an array of strings
    enum: ['Python', 'JavaScript', 'C#', 'C++', 'Flask', 'SQL', 'Ruby','Django'],
  },
}, { timestamps: true });

const PositionSchema = mongoose.model("PositionSchema", position);

module.exports = PositionSchema;
