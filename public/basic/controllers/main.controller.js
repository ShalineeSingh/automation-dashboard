(function () {
  angular.module('app.basic')
    .controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.temp = "In controller";
      console.log($scope.temp);
    }]);
})();