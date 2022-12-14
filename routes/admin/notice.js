module.exports = app => {
  const notice = require("../../controllers/admin/notice.js");

  var router = require("express").Router();

  router.get("/", notice.findAll);

  router.get("/add", notice.findEmpty);

  router.get("/detail/:id", notice.findOne);

  router.post("/add", notice.create);

  router.post("/detail/:id", notice.update);

  router.get("/delete/:id", notice.delete);

  app.use('/admin/notice', router);
};
