module.exports = app => {
  const order = require("../../controllers/admin/order.js");

  var router = require("express").Router();

  router.get("/", order.findAll);

  router.get("/add", order.findEmpty);

  router.get("/detail/:id", order.findOne);

  app.use('/admin/order', router);
};
