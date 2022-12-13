module.exports = app => {
  const community = require("../../controllers/admin/community.js");

  var router = require("express").Router();

  router.get("/", community.findAll);

  router.get("/add", community.findEmpty);

  router.get("/detail/:id", community.findOne);

  app.use('/admin/community', router);
};