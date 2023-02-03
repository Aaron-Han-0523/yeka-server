module.exports = app => {
  const notice = require("../../controllers/admin/notice.js");
  const fileParser = require("../../utils/fileParser");

  var router = require("express").Router();

  router.get("/", notice.findAll);

  router.get("/add", notice.findEmpty);

  router.get("/detail/:id", notice.findOne);

  router.post("/add", fileParser.upload("notice").single("image"), path_injection, notice.create);

  router.post("/detail/:id", fileParser.upload("notice").single("image"), path_injection, notice.update);

  router.get("/delete/:id", notice.delete);

  app.use('/admin/notice', router);

  function path_injection(req, res, next) {
    console.log("notice file :", req.file);
    if (req.file) {
      req.body.community_link = req.file.path;
    }
    next()
  }
};
