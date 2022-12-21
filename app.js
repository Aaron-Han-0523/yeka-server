require('dotenv').config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

var indexRouter = require("./routes/index");
var adminIndexRouter = require("./routes/admin/index");
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// redis 세팅
const RedisStore = connectRedis(session);
const client = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD,
  logErrors: true, // 레디스 에러 로깅
  legacyMode: true,
});
// 세션 세팅
const sessionOption = {
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: process.env.ACCESS_MAXAGE * 60 * 1000,
  },
  store: new RedisStore({ client: client }),
}

client.connect().catch(console.error);

app.use(session(sessionOption));



// ejs 도구 추가
const myUtils = require("./utils/myUtils");
const codezip = require("./codezip");

app.use((req, res, next) => {
  // res.locals.host = req.get('host');
  res.locals.path = path;
  res.locals.myUtils = myUtils;
  res.locals.codezip = codezip;
  return next();
});
const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", indexRouter);
app.use("/admin", adminIndexRouter);
//app.use('/users', usersRouter);

const UPLOADFILES_ROOT = process.env.UPLOADFILES_ROOT || "uploads";

app.use(
  path.join("/", UPLOADFILES_ROOT).replace("\\", "/"),
  express.static(path.join(process.cwd(), UPLOADFILES_ROOT))
);

require("./routes/community")(app);
require("./routes/consulting")(app);
require("./routes/image")(app);
require("./routes/like_product")(app);
require("./routes/menu")(app);
require("./routes/option")(app);
require("./routes/order")(app);
require("./routes/product")(app);
require("./routes/user")(app);
require("./routes/personal_color")(app);

app.use((req, res, next) => {
  if (!req.session.user) {
    res.redirect("/admin/login");
  } else {
    res.locals.user = req.session.user;
    console.log(res.user);
    next();
  }
});

require("./routes/admin/community")(app);
require("./routes/admin/consulting")(app);
require("./routes/admin/image")(app);
require("./routes/admin/like_product")(app);
require("./routes/admin/menu")(app);
require("./routes/admin/option")(app);
require("./routes/admin/order")(app);
require("./routes/admin/product")(app);
require("./routes/admin/user")(app);
require("./routes/admin/notice")(app);
require("./routes/admin/freeboard")(app);
require("./routes/admin/youtube")(app);
require("./routes/admin/consultant")(app);
require("./routes/admin/personal_color")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
