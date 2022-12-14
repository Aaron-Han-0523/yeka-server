module.exports = app => {
  const like_community = require("../../controllers/admin/like_community.js");

  var router = require("express").Router();

  router.get("/", like_community.findAll);

  router.get("/add", like_community.findEmpty);

  router.get("/detail/:id", like_community.findOne);

  router.post("/add", like_community.create);

  router.post("/detail/:id", like_community.update);

  router.get("/delete/:id", like_community.delete);

  app.use('/admin/like_community', router);
};