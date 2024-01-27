const mongoose=require("mongoose")
const SkillSchema=new mongoose.Schema({
    languages:{
        type:Array
    },
    frameworks:{
        type:Array
    },
    bio:{
        type: String
    }, 
    profile:{
        type: String
    },
    devId: {
        type: String
      },
}, { timestamps: true })

const Skill=mongoose.model("Skill",SkillSchema)
module.exports=Skill
