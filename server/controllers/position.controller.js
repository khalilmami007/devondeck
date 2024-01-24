const PositionSchema = require('../models/position.model');

// Read All
module.exports.FindAllPosition = async (req, res) => {
  try {
    const allPositions = await PositionSchema.find();
    res.status(200).json(allPositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create
module.exports.createNewPosition = async (req, res) => {
  try {
    const { Name, Description, Skills } = req.body;

    // Validate Skills against the enum values
    const validSkills = ['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5', 'Skill6', 'Skill7'];
    if (!Skills.every((skill) => validSkills.includes(skill))) {
      return res.status(400).json({ message: 'Invalid skill selected' });
    }

    // Create a new position
    const newPosition = new PositionSchema({
      Name,
      Description,
      Skills,
    });

    // Save the position to the database
    const savedPosition = await newPosition.save();

    res.status(201).json({ message: 'Position created successfully', position: savedPosition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Read One
module.exports.FindOneSinglePosition = (req, res) => {
  PositionSchema.findOne({ _id: req.params.PositionId })
    .then(oneSinglePosition => {
      res.json(oneSinglePosition);
    })
    .catch((err) => {
      res.json(err);
    });
};

// DELETE
module.exports.deleteAnExistingPosition = (req, res) => {
  PositionSchema.deleteOne({ _id: req.params.PositionId })
    .then(result => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// UPDATE
module.exports.updateExistingPosition = (req, res) => {
  console.log(req.body);
  PositionSchema.findOneAndUpdate({ _id: req.params.PositionId }, req.body, { new: true, runValidators: true })
    .then(result => {
      res.json({ done: result });
    })
    .catch((err) => {
      res.json(err);
    });
};
