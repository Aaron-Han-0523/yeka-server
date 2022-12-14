module.exports = app => {
  const user = require("../../controllers/admin/user.js");

  var router = require("express").Router();

  //TODO edit object
  router.post("/detail/:id", user.update);

  router.get("/", user.findAll);

  router.get("/add", user.findEmpty);

  router.post("/add", user.create);

  router.get("/detail/:id", user.findOne);

  router.get("/delete/:id", user.delete);

  app.use('/admin/user', router);
};
