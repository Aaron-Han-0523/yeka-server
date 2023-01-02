module.exports = (app) => {
  const order = require("../controllers/order.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", order.create);

  // Retrieve all Order
  router.get("/", order.findAll);

  // Retrieve all Order
  router.get("/list", order.findAllById);

  // Retrieve all published Order
  router.get("/published", order.findAllPublished);

  // Retrieve a single Order with id
  router.get("/:id", order.findOne);

  // Update a Order with id
  router.put("/:id", order.update);

  // Delete a Order with id
  router.delete("/:id", order.delete);

  // Delete all Order
  router.delete("/", order.deleteAll);

  app.use("/api/order", router);
};
