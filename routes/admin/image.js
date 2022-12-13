module.exports = app => {
  const image = require("../../controllers/admin/image.js");

  var router = require("express").Router();

  router.get("/", image.findAll);

  router.get("/add", image.findEmpty);

  router.get("/detail/:id", image.findOne);

  app.use('/admin/image', router);
};