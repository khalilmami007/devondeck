const mongoose = require ('mongoose');


const position= new mongoose.Schema({

    Name:{
        type:String,
        required:[true,"the Name is required "]
    },
    Description:{
        type:String,
        required:[true,"the Description is required "]

    },
    Skills:{
        type:String,
        enum: ['Skill1', 'Skill2', 'Skill3','Skill4','Skill5','Skill6','Skill7'],
    }
},{timestamps:true})

const PositionSchema = mongoose.model("PositionSchema",position);

module.exports = PositionSchema;