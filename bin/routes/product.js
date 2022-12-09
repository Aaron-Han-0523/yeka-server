module.exports = app => {
  const auto = require("../controllers/auto.js");

  var productr = require("express").Productr();

  // Create a new Auto
  productr.post("/", auto.create);

  // Retrieve all Auto
  productr.get("/", auto.findAll);

  // Retrieve all published Auto
  productr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  productr.get("/:id", auto.findOne);

  // Update a Auto with id
  productr.put("/:id", auto.update);

  // Delete a Auto with id
  productr.delete("/:id", auto.delete);

  // Delete all Auto
  productr.delete("/", auto.deleteAll);

  app.use('/api/auto', productr);
};
