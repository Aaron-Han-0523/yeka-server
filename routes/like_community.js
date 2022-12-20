module.exports = (app) => {
  const likeCommunity = require("../controllers/like_community.js");

  var router = require("express").Router();

  // Create a new LikeCommunity
  router.post("/", likeCommunity.create);

  // Retrieve all LikeCommunity
  router.get("/", likeCommunity.findAll);

  // Retrieve all published LikeCommunity
  router.get("/published", likeCommunity.findAllPublished);

  // Retrieve a single LikeCommunity with id
  router.get("/:id", likeCommunity.findOne);

  // Update a LikeCommunity with id
  router.put("/:id", likeCommunity.update);

  // Delete a LikeCommunity with id
  router.delete("/:id", likeCommunity.delete);

  // Delete all LikeCommunity
  router.delete("/", likeCommunity.deleteAll);

  app.use("/api/likeCommunity", router);
};
