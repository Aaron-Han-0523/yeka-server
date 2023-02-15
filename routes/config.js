module.exports = app => {
  const config = require("../controllers/config.js");

  var router = require("express").Router();

  // Create a new Config
  router.post("/", config.create);

  // Retrieve all Config
  router.get("/", config.findAll);

  // Retrieve all published Config
  router.get("/published", config.findAllPublished);

  // Retrieve a single Config with id
  router.get("/:id", config.findOne);

  // Update a Config with id
  router.put("/:id", config.update);

  // Delete a Config with id
  router.delete("/:id", config.delete);

  // Delete all Config
  router.delete("/", config.deleteAll);

  app.use('/api/config', router);
};
