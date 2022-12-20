module.exports = app => {
  const image = require("../../controllers/admin/image.js");
  const fileParser = require('../../utils/fileParser');

  var router = require("express").Router();

  router.get("/", image.findAll);

  router.get("/add", image.findEmpty);

  router.get("/detail/:id", image.findOne);

  router.post("/add", fileParser.upload("image").single("path"), image.create);

  router.post("/detail/:id", fileParser.upload("image").single("path"), image.update);

  router.get("/delete/:id", image.delete);

  app.use('/admin/image', router);
};