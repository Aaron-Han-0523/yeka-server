module.exports = app => {
  const user = require("../../controllers/admin/user.js");

  var router = require("express").Router();

  // Index page
  router.get("/", user.index);

  app.use('/admin/user', router);
};
