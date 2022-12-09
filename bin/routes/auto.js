module.exports = app => {
  const auto = require("../controllers/auto.js");

  var autor = require("express").Autor();

  // Create a new Auto
  autor.post("/", auto.create);

  // Retrieve all Auto
  autor.get("/", auto.findAll);

  // Retrieve all published Auto
  autor.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  autor.get("/:id", auto.findOne);

  // Update a Auto with id
  autor.put("/:id", auto.update);

  // Delete a Auto with id
  autor.delete("/:id", auto.delete);

  // Delete all Auto
  autor.delete("/", auto.deleteAll);

  app.use('/api/auto', autor);
};
