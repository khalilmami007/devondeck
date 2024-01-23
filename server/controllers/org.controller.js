const OrgSchema = require('../models/org.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Registration
exports.register = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
  
      const {
        orgname,
        firstname,
        lastname,
        contactemail,
        password,
        confirmPassword,
        orgadress,
        orgcity,
        orgstate,
      } = req.body;
  
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
  
      // Check if the passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if the user already exists
      const existingUser = await OrgSchema.findOne({ contactemail });
      if (existingUser) {
        return res.status(400).json({ message: 'organisation already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const neworg = new OrgSchema({
        orgname,
        firstname,
        lastname,
        contactemail,
        password: hashedPassword,
        orgadress,
        orgcity,
        orgstate,
      });
  
      // Save the user to the database
      await neworg.save();
  
      res.status(201).json({ message: 'organisation registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  // Login
exports.login = async (req, res) => {
    try {
      const { contactemail, password } = req.body;
  
      // Check if the user exists
      const org = await OrgSchema.findOne({ contactemail });
      if (!org) {
        return res.status(404).json({ message: 'organisation not found' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, org.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate a token
      const token = jwt.sign({ orgId: org._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };