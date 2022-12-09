module.exports = app => {
  const menu = require("../controllers/menu.js");

  var router = require("express").Router();

  // Create a new Menu
  router.post("/", menu.create);

  // Retrieve all Menu
  router.get("/", menu.findAll);

  // Retrieve all published Menu
  router.get("/published", menu.findAllPublished);

  // Retrieve a single Menu with id
  router.get("/:id", menu.findOne);

  // Update a Menu with id
  router.put("/:id", menu.update);

  // Delete a Menu with id
  router.delete("/:id", menu.delete);

  // Delete all Menu
  router.delete("/", menu.deleteAll);

  app.use('/api/menu', router);
};
