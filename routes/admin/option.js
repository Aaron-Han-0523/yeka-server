module.exports = app => {
  const option = require("../../controllers/admin/option.js");

  var router = require("express").Router();

  router.get("/", option.findAll);

  router.get("/add", option.findEmpty);

  router.get("/detail/:id", option.findOne);

  router.post("/add", option.create);

  router.post("/detail/:id", option.update);

  router.get("/delete/:id", option.delete);

  app.use('/admin/option', router);
};
