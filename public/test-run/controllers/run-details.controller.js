// testRunService

(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', 'testRunService', function ($scope, $rootScope, testRunService) {
      console.log("run details");
    }]);
})();