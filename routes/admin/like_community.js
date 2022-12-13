module.exports = app => {
  const like_community = require("../../controllers/like_community.js");

  var router = require("express").Router();

  // Create a new Like_community
  router.post("/", like_community.create);

  // Retrieve all Like_community
  router.get("/", like_community.findAll);

  // Retrieve all published Like_community
  router.get("/published", like_community.findAllPublished);

  // Retrieve a single Like_community with id
  router.get("/:id", like_community.findOne);

  // Update a Like_community with id
  router.put("/:id", like_community.update);

  // Delete a Like_community with id
  router.delete("/:id", like_community.delete);

  // Delete all Like_community
  router.delete("/", like_community.deleteAll);

  app.use('/admin/like_community', router);
};
