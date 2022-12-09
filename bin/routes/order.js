module.exports = app => {
  const auto = require("../controllers/auto.js");

  var orderr = require("express").Orderr();

  // Create a new Auto
  orderr.post("/", auto.create);

  // Retrieve all Auto
  orderr.get("/", auto.findAll);

  // Retrieve all published Auto
  orderr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  orderr.get("/:id", auto.findOne);

  // Update a Auto with id
  orderr.put("/:id", auto.update);

  // Delete a Auto with id
  orderr.delete("/:id", auto.delete);

  // Delete all Auto
  orderr.delete("/", auto.deleteAll);

  app.use('/api/auto', orderr);
};
