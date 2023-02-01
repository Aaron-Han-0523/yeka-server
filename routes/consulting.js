module.exports = (app) => {
  const consulting = require("../controllers/consulting.js");
  const fileParser = require("../utils/fileParser");
  var router = require("express").Router();

  // Create a new Consulting
  router.post("/", fileParser.upload("consulting").single("client_image"), consulting.create);

  // Retrieve all Consulting
  router.get("/", consulting.findAll);

  // Retrieve all Consulting
  router.get("/consultant/:id", consulting.findAllConsultant);

  // Retrieve all published Consulting
  router.get("/published", consulting.findAllPublished);

  // Retrieve a single Consulting with id
  router.get("/:id", consulting.findOne);

  // Retrieve all Consulting
  router.get("/client/:id", consulting.findOneByClientId);

  // Update a Consulting with id
  router.put("/:id", consulting.update);

  // Delete a Consulting with id
  router.delete("/:id", consulting.delete);

  // Delete all Consulting
  router.delete("/", consulting.deleteAll);

  app.use("/api/consulting", router);
};
