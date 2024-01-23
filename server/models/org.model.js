const mongoose = require("mongoose")


const Org = new mongoose.Schema({
    orgname: {
        type: String,
        required: [true, "the first name is required"]
    },
    firstname: {
        type: String,
        required: [true, "the First name is required"]
    },
   
    lastname: {
        type: String,
        required: [true, "the Last name is required"]
    }, 
    contactemail:{
        type:String,
        required:[true,"the email is required"],
        
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
          }
        
    },
    orgadress: {
        type: String,
        required: [true, "the adress is required"]
    }, 
        orgcity: {
        type: String,
        required: [true, "the city is required"]
    },
    orgstate: {
        type: String,
        required: [true, "the state is required"]
    }, 
    password: {
        type: String,
        required: [true, "the password  is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }

}, { timestamps: true })


const OrgSchema = mongoose.model("OrgSchema", Org)

module.exports = OrgSchema