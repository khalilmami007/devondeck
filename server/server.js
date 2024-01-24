const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json(), express.urlencoded({ extended: true }), cors());


require("dotenv").config()
require("./config/mongoose.config")

const port = process.env.PORT

const Routes = require("./routes/auth.route")
const positionroute= require("./routes/position.route")
Routes(app)
positionroute(app);


app.listen(port, () => {
    console.log(`>>>>> Server is running on Port ${port} 🎈🎈🎈`)
})