module.exports = app => {
  const operation_setting = require("../../controllers/admin/operation_setting.js");

  var router = require("express").Router();

  router.get("/", operation_setting.findAll);

  // router.get("/add", operation_setting.findEmpty);

  router.get("/detail/:id", operation_setting.findOne);

  router.post("/add", operation_setting.create);

  router.post("/detail/:id", operation_setting.update);

  router.get("/delete/:id", operation_setting.delete);

  app.use('/admin/operation_setting', router);
};
