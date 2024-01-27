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
    type: Array, 
    
  },
}, { timestamps: true });

const PositionSchema = mongoose.model("PositionSchema", position);

module.exports = PositionSchema;
