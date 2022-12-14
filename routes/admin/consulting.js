module.exports = app => {
  const consulting = require("../../controllers/admin/consulting.js");

  var router = require("express").Router();

  router.get("/", consulting.findAll);

  router.get("/add", consulting.findEmpty);

  router.get("/detail/:id", consulting.findOne);

  router.post("/add", consulting.create);

  router.post("/detail/:id", consulting.update);

  router.get("/delete/:id", consulting.delete);

  app.use('/admin/consulting', router);
};