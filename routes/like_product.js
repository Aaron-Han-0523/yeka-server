module.exports = (app) => {
  const likeProduct = require("../controllers/like_product.js");

  var router = require("express").Router();

  // Create a new LikeProduct
  router.post("/", likeProduct.create);

  // Retrieve all LikeProduct
  router.get("/", likeProduct.findAll);

  // Retrieve all published LikeProduct
  router.get("/published", likeProduct.findAllPublished);

  // Retrieve a single LikeProduct with id
  router.get("/:id", likeProduct.findOne);

  // Update a LikeProduct with id
  router.put("/:id", likeProduct.update);

  // Delete a LikeProduct with id
  router.delete("/", likeProduct.delete);

  // Delete all LikeProduct
  // router.delete("/", likeProduct.deleteAll);

  app.use("/api/like_product", router);
};
