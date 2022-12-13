module.exports = app => {
  const freeboard = require("../../controllers/admin/freeboard.js");

  var router = require("express").Router();

  router.get("/", freeboard.findAll);

  router.get("/add", freeboard.findEmpty);

  router.get("/detail/:id", freeboard.findOne);

  app.use('/admin/freeboard', router);
};
