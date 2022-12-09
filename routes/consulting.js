module.exports = app => {
  const consulting = require("../controllers/consulting.js");

  var router = require("express").Router();

  // Create a new Consulting
  router.post("/", consulting.create);

  // Retrieve all Consulting
  router.get("/", consulting.findAll);

  // Retrieve all published Consulting
  router.get("/published", consulting.findAllPublished);

  // Retrieve a single Consulting with id
  router.get("/:id", consulting.findOne);

  // Update a Consulting with id
  router.put("/:id", consulting.update);

  // Delete a Consulting with id
  router.delete("/:id", consulting.delete);

  // Delete all Consulting
  router.delete("/", consulting.deleteAll);

  app.use('/api/consulting', router);
};
