const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs =require('express-handlebars');
const bodyParser =           require('body-parser');
const urlEncodedParser =     bodyParser.urlencoded({extended: false});
const Handlebars = require('handlebars');
const indexRouter = require('./routes/index');

/*
* Database
* */
mongoose.connect('mongodb://eucip_student:MongoDragon88@ds119049.mlab.com:19049/eucip');
let db = mongoose.connection;

//check connection
db.once('open',()=>{
    console.log('Connected to mongodb')
});

//check for db errors
db.on('error', (err)=>{
    console.log(err)
});

/*
* App init
* */

const app = express();



Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// view engine setup
app.engine('hbs',hbs({extname:'hbs', defaultLayout:'template'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// catch 404 and forward to error handler


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
