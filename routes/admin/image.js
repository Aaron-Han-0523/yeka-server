module.exports = app => {
  const image = require("../../controllers/admin/image.js");

  var router = require("express").Router();

  router.get("/", image.findAll);

  router.get("/add", image.findEmpty);

  router.get("/detail/:id", image.findOne);

  router.post("/add", image.create);

  router.post("/detail/:id", image.update);

  router.get("/delete/:id", image.delete);

  app.use('/admin/image', router);
};