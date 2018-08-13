var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose=require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var toastr = require('express-toastr');
var logger = require('morgan');
var hbs=require('express-handlebars');

var mongoDB='mongodb://127.0.0.1/achieversagent';

mongoose.connect(mongoDB,function (err,db){
 if (err) throw err
  db.collection('choice').find().toArray(function (err,result) {
    if (err) throw err
      console.log('Connection is successful');
  });
db.collection('contact').find().toArray(function (err,result) {
    if (err) throw err
         console.log('Connection for contact is successful');
  });
});

mongoose.Promise=global.Promise;

// list of routers in the app
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var servicesRouter = require('./routes/services');
var choiceRouter = require('./routes/choice');
var galleryRouter = require('./routes/gallery');
var contactRouter = require('./routes/contact');

var app = express();

// Dependencies
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));



// view engine setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect flash
app.use(flash());

// global var
app.use(function (req,res,next) {
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  next();
});



app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/services', servicesRouter);
app.use('/choice', choiceRouter);
app.use('/gallery', galleryRouter);
app.use('/contact', contactRouter);

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
