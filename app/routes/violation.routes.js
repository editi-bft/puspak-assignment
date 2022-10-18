module.exports = app => {
    const violation = require("../controllers/violation.controller");
  
    var router = require("express").Router();
  
    // Create a new Violation
    router.post("/", violation.create);
  
    // Retrieve all violation
    router.get("/", violation.findAll);
    
    // Retrieve a single Violation with id
    router.get("/:id", violation.findOne);
  
    // Update a Violation with id
    router.put("/:id", violation.update);
  
    // Delete a Violation with id
    router.delete("/:id", violation.delete);
  
    app.use('/api/violation', router);
  };