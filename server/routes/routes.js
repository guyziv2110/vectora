var app = require('express');
var router = app.Router();
var passport = require('passport');
var multiparty = require('connect-multiparty');

var multipartyMiddleware = multiparty();
var fileController = require('../controllers/fileController.js');

router.post('/file/upload', multipartyMiddleware, fileController.upload);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#signin');
});

router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope : 'email' 
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/success',
  failureRedirect : '/#signin'
}));

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect : '/success',
  failureRedirect : '/#signin'
}));


router.get('*', function (req, res) {
  res.render('index.html', { user: req.user ? req.user : null });
});

module.exports = router;