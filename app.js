var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { sequelize } = require('./models');

sequelize.sync({ force: false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

require("./routes/community")(app);
require("./routes/consulting")(app);
require("./routes/image")(app);
require("./routes/like_community")(app);
require("./routes/menu")(app);
require("./routes/option")(app);
require("./routes/order")(app);
require("./routes/product")(app);
require("./routes/user")(app);

require("./routes/admin/community")(app);
require("./routes/admin/consulting")(app);
require("./routes/admin/image")(app);
require("./routes/admin/like_community")(app);
require("./routes/admin/menu")(app);
require("./routes/admin/option")(app);
require("./routes/admin/order")(app);
require("./routes/admin/product")(app);
require("./routes/admin/user")(app);
require("./routes/admin/notice")(app);
require("./routes/admin/freeboard")(app);
require("./routes/admin/youtube")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
