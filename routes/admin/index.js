var express = require("express");
const { where } = require("sequelize");
const User = require("../../models").user;
var router = express.Router();

/* GET home page. */
router.get("/login", (req, res, next) => res.render("admin/login"));
router.post("/login", (req, res, next) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        if (password == user.password) {
          req.session.user = user;

          //세션 스토어가 이루어진 후 redirect를 해야함.
          req.session.save(() => {
            return res.redirect("/admin");
          });
        } else {
          return res.redirect("back");
        }
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).end();
    });
});
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("로그아웃 : 세션 삭제 실패");
      return res.status(500).end();
    }
    console.log("세션 삭제 완료");
    return res.redirect("/admin/login");
  });
});

router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/admin/notice");
  } else {
    res.redirect("/admin/login");
  }
});

module.exports = router;
