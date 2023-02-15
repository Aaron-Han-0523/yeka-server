module.exports = app => {
  const config = require("../../controllers/admin/config.js");

  var router = require("express").Router();

  router.get("/", config.findAll);

  // router.get("/add", config.findEmpty);

  router.get("/detail/:id", config.findOne);

  router.post("/add", config.create);

  router.post("/detail/:id", config.update);

  router.get("/delete/:id", config.delete);

  app.use('/admin/config', router);
};
