module.exports = (app) => {
  const personalColor = require("../controllers/personal_color.js");

  var router = require("express").Router();

  // Create a new personalColor
  router.post("/", personalColor.create);

  // Retrieve all personalColor
  router.get("/", personalColor.findAll);

  // Retrieve all published personalColor
  router.get("/published", personalColor.findAllPublished);

  // Retrieve a single personalColor with id
  router.get("/:id", personalColor.findOne);

  // Update a personalColor with id
  router.put("/:id", personalColor.update);

  // Delete a personalColor with id
  router.delete("/:id", personalColor.delete);

  // Delete all personalColor
  router.delete("/", personalColor.deleteAll);

  app.use("/api/personal_color", router);
};
