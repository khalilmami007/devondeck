const Skill=require("../models/skills.model")

module.exports.createNewSkill=(req,res)=>{
    Skill.create(req.body)
    .then(newSkill=>{
        res.json({Skill:newSkill})
    })
    .catch(err => res.status(400).json(err))
}

module.exports.getAllSkills = (request, response) => {
    Skill.find({})
        .then(Skills => {
            response.json(Skills);
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getOneSkill=(request,response)=>{
    Skill.findOne({_id:request.params.id})
    .then(Skill=>{
        response.json(Skill)
    })
    .catch(err => {
        response.json(err)
    })
}

module.exports.updateSkill = (request, response) => {
    Skill.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedSkill => response.json(updatedSkill))
        .catch(err => response.json(err))
}



module.exports.deleteSkill = (request, response) => {
    Skill.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

