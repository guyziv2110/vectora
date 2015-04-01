var app = angular.module('vectora', ['controllers', 'angularFileUpload']).run(['$rootScope', function($rootScope) {

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
