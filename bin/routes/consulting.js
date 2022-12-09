module.exports = app => {
  const auto = require("../controllers/auto.js");

  var consultingr = require("express").Consultingr();

  // Create a new Auto
  consultingr.post("/", auto.create);

  // Retrieve all Auto
  consultingr.get("/", auto.findAll);

  // Retrieve all published Auto
  consultingr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  consultingr.get("/:id", auto.findOne);

  // Update a Auto with id
  consultingr.put("/:id", auto.update);

  // Delete a Auto with id
  consultingr.delete("/:id", auto.delete);

  // Delete all Auto
  consultingr.delete("/", auto.deleteAll);

  app.use('/api/auto', consultingr);
};
