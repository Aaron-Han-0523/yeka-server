module.exports = app => {
  const youtube = require("../../controllers/admin/youtube.js");

  var router = require("express").Router();

  router.get("/", youtube.findAll);

  router.get("/add", youtube.findEmpty);

  router.get("/detail/:id", youtube.findOne);

  app.use('/admin/youtube', router);
};
