const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const DeveloperSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"The firstname is required"],
        minLength: [2, "Name must be at least 2 characters in length"],
    },
    lastName:{
        type:String,
        required:[true,"The lastname is required"],
        minLength: [2, "Name must be at least 2 characters in length"],
    },
    email:{
        type: String,
        required: [true, "Email is required"] ,
        unique:[true, "Email already exists"],
        validate: {
          validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Please enter a valid email"
        }
    }, 
    adress: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      password: {
        type: String
      }
}, { timestamps: true })
DeveloperSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });
const Developer=mongoose.model("Developer",DeveloperSchema)
module.exports=Developer
