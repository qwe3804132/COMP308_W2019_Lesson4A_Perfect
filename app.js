let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//npm install express-generator -g
//express -e
//npm init
//npm install
//npm install @types/node @types/express @types/cookie-parser @types/body-parser --save-dev
//npm install @types/morgan --save-dev
//npm install mongoose --save
//npm install @types/mongoose --save-dev


//git init
//git add .
//git commit -m "first commit"
//npm i bootstrap jquery popper.js font-awesome --save


//mongod
//mongo


//git remote rm origin 如果要把当前已经有索引的文件，到新的github repoisitiry.删除原来的remote控制





// database setup
let mongoose = require("mongoose");
let DB = require("./config/db");

// point Mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log("Connected to MongoDB...");
})

// route setup
let indexRouter = require('./routes/index');
let contactRouter = require('./routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/contact-list', contactRouter);

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
