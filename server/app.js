require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
const cors = require('cors');   

require('./configs/db.config');
require('./configs/passport/index');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));


// hbs.registerHelper('ifUndefined', (value, options) => {
//   if (arguments.length < 2)
//       throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
//   if (typeof value !== undefined ) {
//       return options.inverse(this);
//   } else {
//       return options.fn(this);
//   }
// });
  

// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';


app.use(session({
  secret: 'draw-now-app',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore( { 
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 })
}))


app.use(passport.initialize())
app.use(passport.session())
    

const index = require('./routes');
app.use('/', index);
      
app.use((req, res) => {     res.sendFile(__dirname + "/public/index.html");    });

module.exports = app;
