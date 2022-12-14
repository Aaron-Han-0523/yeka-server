module.exports = app => {
  const order = require("../../controllers/admin/order.js");

  var router = require("express").Router();

  router.get("/", order.findAll);

  router.get("/add", order.findEmpty);

  router.get("/detail/:id", order.findOne);

  router.post("/add", order.create);

  router.post("/detail/:id", order.update);

  router.get("/delete/:id", order.delete);

  app.use('/admin/order', router);
};
