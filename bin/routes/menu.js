module.exports = app => {
  const auto = require("../controllers/auto.js");

  var menur = require("express").Menur();

  // Create a new Auto
  menur.post("/", auto.create);

  // Retrieve all Auto
  menur.get("/", auto.findAll);

  // Retrieve all published Auto
  menur.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  menur.get("/:id", auto.findOne);

  // Update a Auto with id
  menur.put("/:id", auto.update);

  // Delete a Auto with id
  menur.delete("/:id", auto.delete);

  // Delete all Auto
  menur.delete("/", auto.deleteAll);

  app.use('/api/auto', menur);
};
