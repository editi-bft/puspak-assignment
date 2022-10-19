const connection = require('../../db')

// Create and Save a new Vehicle
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Vehicle details can not be empty!"
      });
    }
  
    // Create a Vehicle  
    // Save Vehicle in the database
    connection.query("INSERT INTO vehicle SET ?", [req.body], (err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Vehicle."
        });
      else res.send(data);
      });
  };

// Retrieve all Vehicles from the database.
exports.findAll = (req, res) => {  
    connection.query(`SELECT * FROM vehicle`, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving Vehicle"
            })
          } else res.send(data);
    });
  };
  
// Find a single Vehicle with a id
exports.findOne = (req, res) => {
    connection.query(`SELECT * FROM vehicle WHERE id =?`, [req.params.id], (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving Vehicle with id " + req.params.id
            });
          } else res.send(data[0]);
    });
};

// Update a Vehicle identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const {licensePlateNumber, manufacturerName, model, fuelType, ownerName, rc_status, vehicleColor, registrationDate, insuranceUpto, fitnessUpto, roadTaxUpto} = req.body;

  connection.query('Update vehicle SET licensePlateNumber=?, manufacturerName=?, model=?, fuelType=?, ownerName=?, rc_status=?, vehicleColor=?, registrationDate=?, insuranceUpto=?, fitnessUpto=?, roadTaxUpto=? WHERE id=?',[licensePlateNumber, manufacturerName, model, fuelType, ownerName, rc_status, vehicleColor, registrationDate, insuranceUpto, fitnessUpto, roadTaxUpto, req.params.id],
    (err, data) => {
      if (err) {
        if(err.code === 'ER_ROW_IS_REFERENCED_2'){
          return res.status(546).send({
            message: "Can't update vechicle, it has violation"
          });
        }
        res.status(500).send({
          message: "Error updating Vehicle with id " + req.params.id
        });
      } else res.send(data);
    }
  );
};

// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
    connection.query("DELETE FROM vehicle WHERE id = ?", [req.params.id], (err, data) => {
      if (err) {
        console.log(err)
        if(err.code === 'ER_ROW_IS_REFERENCED_2'){
          return res.status(546).send({
            message: "Can't delete vechicle, it has violation"
          });
        }
        res.status(500).send({
          message: "Could not delete Vehicle with id " + req.params.id
        });
      } else res.send({ message: `Vehicle was deleted successfully!` });
    });
};
