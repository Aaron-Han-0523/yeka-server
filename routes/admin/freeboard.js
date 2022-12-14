module.exports = app => {
  const freeboard = require("../../controllers/admin/freeboard.js");

  var router = require("express").Router();

  router.get("/", freeboard.findAll);

  router.get("/add", freeboard.findEmpty);

  router.get("/detail/:id", freeboard.findOne);

  router.post("/add", freeboard.create);

  router.post("/detail/:id", freeboard.update);

  router.get("/delete/:id", freeboard.delete);

  app.use('/admin/freeboard', router);
};
