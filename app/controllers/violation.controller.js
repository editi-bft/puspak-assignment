const connection = require('../../db')

// Create and Save a new violation
exports.create = (req, res) => {
     // Validate request
     if (!req.body) {
      res.status(400).send({
        message: "Violation details can not be empty!"
      });
    } 
    
    // Create a violation  
    // Save violation in the database
    connection.query("INSERT INTO violation SET ?", [req.body], (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle."
      });
    else res.send(data);
    });
};


// Retrieve all violation from the database (with condition).
exports.findAll = (req, res) => {
  connection.query(`SELECT * FROM violation`, (err, data) => {
    if (err) {
        res.status(500).send({
            message: "Error retrieving violation"
        })
      } else res.send(data);
}); 
};

// Find a single violation with a id
exports.findOne = (req, res) => {
  connection.query(`SELECT * FROM violation WHERE id =?`, [req.params.id], (err, data) => {
    if (err) {
        res.status(500).send({
            message: "Error retrieving violation with id " + req.params.id
        });
      } else res.send(data[0]);
}); 
};


  
// Update a violation identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const {licensePlateNumber, violationType, status, date, time, location, videoUrl } = req.body;

  connection.query('Update violation SET licensePlateNumber=?, violationType=?, status=?, date=?, time=?, location=?, videoUrl=?  WHERE id=?',[licensePlateNumber, violationType, status, date, time, location, videoUrl, req.params.id],
    (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error updating violation with id " + req.params.id
          });
      } else res.send(data);
    }
  );
};

// Delete a violation with the specified id in the request
exports.delete = (req, res) => {
  connection.query("DELETE FROM violation WHERE id = ?", [req.params.id], (err, data) => {
    if (err) {
        res.status(500).send({
          message: "Could not delete violation with id " + req.params.id
        });
    } else res.send({ message: `Violation was deleted successfully!` });
  });
};
