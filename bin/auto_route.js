module.exports = app => {
  const auto = require("../controllers/auto.js");

  var router = require("express").Router();

  // Create a new Auto
  router.post("/", auto.create);

  // Retrieve all Auto
  router.get("/", auto.findAll);

  // Retrieve all published Auto
  router.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  router.get("/:id", auto.findOne);

  // Update a Auto with id
  router.put("/:id", auto.update);

  // Delete a Auto with id
  router.delete("/:id", auto.delete);

  // Delete all Auto
  router.delete("/", auto.deleteAll);

  app.use('/api/auto', router);
};
