var services = angular.module('services', []);

services.factory('sessionService', ['$rootScope', '$window', '$http',
  function($rootScope, $window, $http) {
    var session = {
      init: function() {
        this.resetSession();
      },
      resetSession: function() {
        this.currentUser = null;
        this.isLoggedIn = false;
        $rootScope.isLoggedIn = false;
      },
      facebookLogin: function() {
        var url = '/auth/facebook';
        $window.open(url, 'facebook-login');
      },
      googleLogin: function() {
        var url = '/auth/google';
        $window.open(url, 'google-login');
      },
      logout: function() {
        var scope = this;
        $http.delete('/auth').success(function() {
          scope.resetSession();
          $rootScope.$emit('session-changed');
        });
      },
      authSuccess: function(userData) {
        this.currentUser = userData;
        this.isLoggedIn = true;
        $rootScope.isLoggedIn = true;
        $rootScope.$emit('session-changed');
      },
      authFailed: function() {
        this.resetSession();
        alert('Authentication failed');
      }
    };
    session.init();
    return session;
  }
]);
