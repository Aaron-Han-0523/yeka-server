module.exports = app => {
  const user = require("../../controllers/admin/user.js");

  var router = require("express").Router();

  router.get("/", user.findAll);

  router.get("/add", user.findEmpty);

  router.get("/detail/:id", user.findOne);

  app.use('/admin/user', router);
};
