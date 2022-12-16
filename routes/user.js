module.exports = app => {
  const user = require("../controllers/user.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all User
  router.get("/", user.findAll);

  // Retrieve all User with Thumbnail
  router.get("/list", user.findAllThumbnail);

  // Retrieve all published User
  router.get("/published", user.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", user.findOne);

  // Update a User with id
  router.put("/:id", user.update);

  // Delete a User with id
  router.delete("/:id", user.delete);

  // Delete all User
  router.delete("/", user.deleteAll);

  // Retrieve all Product with Thumbnail
  router.post("/login", user.login);

  // Retrieve all Product with Thumbnail
  router.post("/register", user.register);

  app.use('/api/user', router);
};
