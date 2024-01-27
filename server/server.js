const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const app = express()

app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


require("dotenv").config()
require("./config/mongoose.config")

const port = process.env.PORT

const Routes = require("./routes/auth.route")
const positionroute= require("./routes/position.route")
 const userRoute = require('./routes/developer.routes')
Routes(app)
positionroute(app);
userRoute(app);

app.listen(port, () => {
    console.log(`>>>>> Server is running on Port ${port} 🎈🎈🎈`)
})