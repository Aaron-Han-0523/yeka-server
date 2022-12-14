module.exports = app => {
  const consultant = require("../../controllers/admin/consultant.js");

  var router = require("express").Router();

  //TODO edit object
  router.post("/detail/:id", consultant.update);

  router.get("/", consultant.findAll);

  router.get("/add", consultant.findEmpty);

  router.post("/add", consultant.create);

  router.get("/detail/:id", consultant.findOne);

  router.get("/delete/:id", consultant.delete);

  app.use('/admin/consultant', router);
};
