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
module.exports.createPosition = (req, res) => {
  PositionSchema.create(req.body)
    .then(newPosition => {
      res.status(201).json({ message: 'Position created successfully', position: newPosition });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        for (const field in err.errors) {
          validationErrors[field] = err.errors[field].message;
        }
        return res.status(400).json({ error: 'Validation failed', validationErrors });
      }
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
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
