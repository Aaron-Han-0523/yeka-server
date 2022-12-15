module.exports = (app) => {
  const personalColor = require("../../controllers/admin/personal_color.js");

  var router = require("express").Router();

  router.get("/", personalColor.findAll);

  router.get("/add", personalColor.findEmpty);

  router.get("/detail/:id", personalColor.findOne);

  router.post("/add", personalColor.create);

  router.post("/detail/:id", personalColor.update);

  router.get("/delete/:id", personalColor.delete);

  app.use("/admin/personal_color", router);
};
