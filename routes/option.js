module.exports = app => {
  const option = require("../controllers/option.js");

  var router = require("express").Router();

  // Create a new Option
  router.post("/", option.create);

  // Retrieve all Option
  router.get("/", option.findAll);

  // Retrieve all published Option
  router.get("/published", option.findAllPublished);

  // Retrieve a single Option with id
  router.get("/:id", option.findOne);

  // Update a Option with id
  router.put("/:id", option.update);

  // Delete a Option with id
  router.delete("/:id", option.delete);

  // Delete all Option
  router.delete("/", option.deleteAll);

  app.use('/api/option', router);
};
