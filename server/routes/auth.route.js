const orgcontroller=require('../controllers/org.controller');

module.exports = (app) => {
    // Registration route
    app.post('/register', orgcontroller.register);
    
    // Login route
    app.post('/login', orgcontroller.login);

    //logout route
    app.post('/logout', orgcontroller.logout);


}