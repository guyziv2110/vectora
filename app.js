/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./server/routes/routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , session = require('cookie-session');

mongoose.connect('mongodb://admin:AVS!sma0t@ds061391.mongolab.com:61391/vectora', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database ' + res);
  }
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    maxage : 1000*60*60
  })
);
app.use('/', routes);



http.createServer(app).listen(app.get('port'), function () {
    var splash = function () {/*
 __     _______ ____ _____ ___  ____      _    
 \ \   / / ____/ ___|_   _/ _ \|  _ \    / \   
  \ \ / /|  _|| |     | || | | | |_) |  / _ \  
   \ V / | |__| |___  | || |_| |  _ <  / ___ \ 
    \_/  |_____\____| |_| \___/|_| \_\/_/   \_\
                                                                 
         */};
    console.log(splash.toString().match(/\/\*([\s\S]*)\*\//m)[1]);
      console.log("listening on port " + app.get('port'));
  });