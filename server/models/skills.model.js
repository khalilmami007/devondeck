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
         
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Developer' // Reference to the Developer model
        ,
      },
}, { timestamps: true })

const Skill=mongoose.model("Skill",SkillSchema)
module.exports=Skill
