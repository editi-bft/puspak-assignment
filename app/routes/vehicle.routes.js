module.exports = app => {
    const vehicle = require("../controllers/vehicle.controller");
  
    var router = require("express").Router();
  
    // Create a new vehicle
    router.post("/", vehicle.create);
  
    // Retrieve all vehicle
    router.get("/", vehicle.findAll);
  
  
    // Retrieve a single vehicle with id
    router.get("/:id", vehicle.findOne);
  
    // Update a vehicle with id
    router.put("/:id", vehicle.update);
  
    // Delete a vehicle with id
    router.delete("/:id", vehicle.delete);
  
    app.use('/api/vehicle', router);
  };