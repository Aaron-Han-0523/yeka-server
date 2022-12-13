module.exports = app => {
  const product = require("../../controllers/admin/product.js");

  var router = require("express").Router();

  router.get("/", product.findAll);

  router.get("/add", product.findEmpty);

  router.get("/detail/:id", product.findOne);

  app.use('/admin/product', router);
};
