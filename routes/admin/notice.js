module.exports = app => {
  const notice = require("../../controllers/admin/notice.js");

  var router = require("express").Router();

  router.get("/", notice.findAll);

  router.get("/add", notice.findEmpty);

  router.get("/detail/:id", notice.findOne);

  app.use('/admin/notice', router);
};
