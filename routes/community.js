module.exports = (app) => {
  const community = require("../controllers/community.js");

  var router = require("express").Router();

  // Create a new Community
  router.post("/", community.create);

  // Retrieve all Community
  router.get("/", community.findAll);

  // Retrieve all Community
  router.get("/notice", community.findAllNotice);

  // Retrieve all Community
  router.get("/youtube", community.findAllYoutube);

  // Retrieve all Community
  router.get("/freeboard", community.findAllFreeboard);

  // Retrieve all published Community
  router.get("/published", community.findAllPublished);

  // Retrieve a single Community with id
  router.get("/:id", community.findOne);

  // Update a Community with id
  router.put("/:id", community.update);

  // Delete a Community with id
  router.delete("/:id", community.delete);

  // Delete all Community
  router.delete("/", community.deleteAll);

  app.use("/api/community", router);
};
