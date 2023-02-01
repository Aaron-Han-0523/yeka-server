module.exports = (app) => {
  const image = require("../controllers/image.js");
  const fileParser = require("../utils/fileParser");

  var router = require("express").Router();

  // Create a new Image
  router.post(
    "/community",
    fileParser.upload("community").single("file"),
    image.create
  );

  // Create a new Image
  router.post(
    "/product",
    fileParser.upload("product").single("file"),
    image.create
  );

  // Create a new Image
  router.post("/user", fileParser.upload("user").single("file"), image.create);

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

  // Retrieve a single User Image with id and image_type
  router.get("/:id/:image_type", image.findOneUser);

  // Update a Image with id
  router.put("/:id", image.update);

  // Delete a Image with id
  router.delete("/:id", image.delete);

  // Delete all Image
  router.delete("/", image.deleteAll);

  app.use("/api/image", router);
};
