module.exports = app => {
  const community = require("../../controllers/admin/community.js");

  var router = require("express").Router();

  router.get("/", community.findAll);

  router.get("/add", community.findEmpty);

  router.get("/detail/:id", community.findOne);

  router.post("/add", community.create);

  router.post("/detail/:id", community.update);

  router.get("/delete/:id", community.delete);

  app.use('/admin/community', router);
};