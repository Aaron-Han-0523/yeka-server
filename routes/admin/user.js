module.exports = app => {
  const user = require("../../controllers/admin/user.js");

  var router = require("express").Router();

  //TODO create object
  router.post("/detail", user.create);

  router.get("/", user.findAll);

  router.get("/add", user.findEmpty);

  router.get("/detail/:id", user.findOne);

  app.use('/admin/user', router);
};
