module.exports = app => {
  const auto = require("../controllers/auto.js");

  var userr = require("express").Userr();

  // Create a new Auto
  userr.post("/", auto.create);

  // Retrieve all Auto
  userr.get("/", auto.findAll);

  // Retrieve all published Auto
  userr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  userr.get("/:id", auto.findOne);

  // Update a Auto with id
  userr.put("/:id", auto.update);

  // Delete a Auto with id
  userr.delete("/:id", auto.delete);

  // Delete all Auto
  userr.delete("/", auto.deleteAll);

  app.use('/api/auto', userr);
};
