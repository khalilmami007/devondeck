const DeveloperController = require("../controllers/developer.controller");
const SkillController = require("../controllers/skills.controller");

module.exports = (app) => {
    // dev routes
    app.post('/api/devs/register', DeveloperController.register);
    app.post('/api/devs/login', DeveloperController.login);
    app.post('/api/devs/logout', DeveloperController.logout);
    // app.get('/api/devs', DeveloperController.getAllDevelopers);
    app.get('/api/devs', DeveloperController.getAllDevelopersWithSkills);

    

    // skills routes
    app.post('/api/skills/languages', SkillController.createNewSkill);
    app.get('/api/skills', SkillController.getAllSkills);
    app.get('/api/skills/:id', SkillController.getOneSkill);
    app.patch('/api/skills/frameworks/:id', SkillController.updateSkill);
    app.delete('/api/skills/:id', SkillController.deleteSkill);
};