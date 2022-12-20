module.exports = (app) => {
  const image = require("../controllers/image.js");

  var router = require("express").Router();

  // Create a new Image
  router.post("/", image.create);

  // Retrieve all Image
  router.get("/", image.findAll);

  // Retrieve all Image with ConsultantId
  router.get("/community/:community_id", image.findAllCommunityId);

  // Retrieve all Image with ConsultantId
  router.get("/consultant/:consultant_id", image.findAllConsultantId);

  // Retrieve all Image with ProductId
  router.get("/product/:product_id", image.findAllProductId);

  // Retrieve all published Image
  router.get("/published", image.findAllPublished);

  // Retrieve a single Image with id
  router.get("/:id", image.findOne);

  // Update a Image with id
  router.put("/:id", image.update);

  // Delete a Image with id
  router.delete("/:id", image.delete);

  // Delete all Image
  router.delete("/", image.deleteAll);

  app.use("/api/image", router);
};
