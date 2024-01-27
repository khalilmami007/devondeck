const poscontroller = require('../controllers/position.controller');

module.exports = (app) => {
  // Read All Positions
  app.get('/positions', poscontroller.FindAllPosition);

  // Create a New Position
  app.post('/positions', poscontroller.createPosition);

  // Read One Position
  app.get('/positions/:positionId', poscontroller.FindOneSinglePosition);

  // Delete an Existing Position
  app.delete('/positions/:positionId', poscontroller.deleteAnExistingPosition);

  // Update an Existing Position
  app.put('/positions/:positionId', poscontroller.updateExistingPosition);
};
