var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginController = require('./routes/login');
var menuController = require('./routes/menu');
var createMovieController = require('./routes/createMovie');
var searchMovieController = require('./routes/searchMovie');
var movieDataPageController = require('./routes/movieDataPage');
var userManagementController = require('./routes/usersManagementPage');
var addUSerController = require('./routes/addUser');
var deleteController = require('./routes/delete');
var updateController = require('./routes/update');
var app = express();
app.use(session({
  secret: 'My Secret',
  resave: true,
  //cookie: { expires: 20 * 100000 },
  saveUninitialized: true,
  rolling: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginController);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', menuController);
app.use('/createMovie', createMovieController);
app.use('/searchMovie', searchMovieController);
app.use('/movieDataPage', movieDataPageController);
app.use('/usersManagementPage', userManagementController);
app.use('/userDataPage', addUSerController);
app.use('/delete', deleteController);
app.use('/update', updateController);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
