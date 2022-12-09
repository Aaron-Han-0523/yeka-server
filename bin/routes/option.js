module.exports = app => {
  const auto = require("../controllers/auto.js");

  var optionr = require("express").Optionr();

  // Create a new Auto
  optionr.post("/", auto.create);

  // Retrieve all Auto
  optionr.get("/", auto.findAll);

  // Retrieve all published Auto
  optionr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  optionr.get("/:id", auto.findOne);

  // Update a Auto with id
  optionr.put("/:id", auto.update);

  // Delete a Auto with id
  optionr.delete("/:id", auto.delete);

  // Delete all Auto
  optionr.delete("/", auto.deleteAll);

  app.use('/api/auto', optionr);
};
