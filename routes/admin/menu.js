module.exports = app => {
  const menu = require("../../controllers/admin/menu.js");

  var router = require("express").Router();

  router.get("/", menu.findAll);

  router.get("/add", menu.findEmpty);

  router.get("/detail/:id", menu.findOne);

  app.use('/admin/menu', router);
};
