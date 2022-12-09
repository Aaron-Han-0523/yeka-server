module.exports = app => {
  const auto = require("../controllers/auto.js");

  var communityr = require("express").Communityr();

  // Create a new Auto
  communityr.post("/", auto.create);

  // Retrieve all Auto
  communityr.get("/", auto.findAll);

  // Retrieve all published Auto
  communityr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  communityr.get("/:id", auto.findOne);

  // Update a Auto with id
  communityr.put("/:id", auto.update);

  // Delete a Auto with id
  communityr.delete("/:id", auto.delete);

  // Delete all Auto
  communityr.delete("/", auto.deleteAll);

  app.use('/api/auto', communityr);
};
