module.exports = app => {
  const auto = require("../controllers/auto.js");

  var imager = require("express").Imager();

  // Create a new Auto
  imager.post("/", auto.create);

  // Retrieve all Auto
  imager.get("/", auto.findAll);

  // Retrieve all published Auto
  imager.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  imager.get("/:id", auto.findOne);

  // Update a Auto with id
  imager.put("/:id", auto.update);

  // Delete a Auto with id
  imager.delete("/:id", auto.delete);

  // Delete all Auto
  imager.delete("/", auto.deleteAll);

  app.use('/api/auto', imager);
};
