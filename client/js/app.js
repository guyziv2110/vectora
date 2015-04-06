var app = angular.module('vectora', ['controllers', 'services', 'angularFileUpload']).run(['$rootScope', '$window', 'sessionService', function($rootScope, $window, sessionService) {

  $rootScope.session = sessionService;

  $window.app = {
    authState: function(state, user) {
      $rootScope.$apply(function() {
        switch (state) {
          case 'success':
            sessionService.authSuccess(user);
            break;
          case 'failure':
            sessionService.authFailed();
            break;
          }
      });
    }
  };

  if ($window.user !== null) {
    sessionService.authSuccess($window.user);
  }
}]);

app.directive('droppable', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var el = element[0];
      var counter = 0;
      el.addEventListener('dragenter', function(e) {
        counter++;
        this.classList.add('dragover');
        $rootScope.dragDropState = 'dragover';
        $rootScope.$apply();
        return false;
      }, false);
      el.addEventListener('dragleave', function(e) {
        counter--;
        if (counter === 0) {
          this.classList.remove('dragover');
          $rootScope.dragDropState = '';
          $rootScope.$apply();
        }
        return false;
      }, false);
      el.addEventListener('drop', function(e) {
        if (e.stopPropagation)
          e.stopPropagation();
        this.classList.remove('dragover');
        $rootScope.dragDropState = '';
        $rootScope.$apply();
        return false;
      }, false);
    }
  };
}]);
