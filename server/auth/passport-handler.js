var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;
var authConfig          = require('./auth-config');

module.exports = function(passport,User) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // FACEBOOK
  passport.use(

    new FacebookStrategy({
      clientID        : authConfig.facebookAuth.clientID,
      clientSecret    : authConfig.facebookAuth.clientSecret,
      callbackURL     : authConfig.facebookAuth.callbackURL
    },

    function(token, refreshToken, profile, done) {

      process.nextTick(function() {

        User.findByEmailOrQuery( profile.emails[0].value, { 'facebook.id' : profile.id }, function(err, user) {

          if (err) return done(err);

          if (!user) {
            var user = new User();
          }

          user.facebook.id    = profile.id; 
          user.facebook.token = token; 
          user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; 
          user.email          = profile.emails[0].value; 

          user.save(function(err) {
            if (err) throw err;
            return done(null, user);
          });

        });
      });

    })
  );

  // GOOGLE
  passport.use(
    new GoogleStrategy({
      clientID        : authConfig.googleAuth.clientID,
      clientSecret    : authConfig.googleAuth.clientSecret,
      callbackURL     : authConfig.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {

      process.nextTick(function() {

        User.findByEmailOrQuery( profile.emails[0].value, { 'google.id' : profile.id }, function(err, user) {

          if (err) return done(err);

          if (!user) {
            var user = new User();
          } 

          user.google.id    = profile.id;
          user.google.token = token;
          user.google.name  = profile.displayName;
          user.email        = profile.emails[0].value; 

          user.save(function(err) {
            if (err) throw err;
            return done(null, user);
          });

        });
      });

    })
  );
};