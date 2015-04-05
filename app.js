var path            = require('path');
var express         = require('express');
var app             = express();
var port            = process.env.PORT || 3000;
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passportHandler = require('./server/auth/passport-handler');
var authMiddleware  = require('./server/auth/auth-middleware');
var routes          = require('./server/routes/routes');
var User            = require('./server/models/user-model');
var mongoose        = require('mongoose');
var mongoUri        = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://admin:AVS!sma0t@ds061391.mongolab.com:61391/vectora'; //mongodb://localhost/vectora';
mongoose.connect(mongoUri); 
console.log('Connected to MongoDB at: ' + mongoUri);

passportHandler(passport,User);

app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(cookieParser()); 
app.use(session({ secret: 'caffenoamazon', resave:true, saveUninitialized:true })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use(authMiddleware());
app.use('/', routes);

console.log('App listening on port: ' + port);
app.listen(port, function () {
  var splash = function () {
    /*
     __     _______ ____ _____ ___  ____      _    
     \ \   / / ____/ ___|_   _/ _ \|  _ \    / \   
      \ \ / /|  _|| |     | || | | | |_) |  / _ \  
       \ V / | |__| |___  | || |_| |  _ <  / ___ \ 
        \_/  |_____\____| |_| \___/|_| \_\/_/   \_\                                                       
    */
  };
  console.log(splash.toString().match(/\/\*([\s\S]*)\*\//m)[1]);
});