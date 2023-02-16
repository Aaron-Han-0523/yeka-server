module.exports = app => {
  const operation_setting = require("../controllers/operation_setting.js");

  var router = require("express").Router();

  // Create a new OperationSetting
  router.post("/", operation_setting.create);

  // Retrieve all OperationSetting
  router.get("/", operation_setting.findAll);

  // Retrieve all published OperationSetting
  router.get("/published", operation_setting.findAllPublished);

  // Retrieve a single OperationSetting with id
  router.get("/:id", operation_setting.findOne);

  // Update a OperationSetting with id
  router.put("/:id", operation_setting.update);

  // Delete a OperationSetting with id
  router.delete("/:id", operation_setting.delete);

  // Delete all OperationSetting
  router.delete("/", operation_setting.deleteAll);

  app.use('/api/operation_setting', router);
};
