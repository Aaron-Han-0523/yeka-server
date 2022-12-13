module.exports = app => {
  const consulting = require("../../controllers/admin/consulting.js");

  var router = require("express").Router();

  router.get("/", consulting.findAll);

  router.get("/add", consulting.findEmpty);

  router.get("/detail/:id", consulting.findOne);

  app.use('/admin/consulting', router);
};