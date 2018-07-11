// testRunService

(function () {
  angular.module('basic.platform')
    .controller('testRunCtrl', ['$scope', '$rootScope', 'testRunService', function ($scope, $rootScope, testRunService) {
      var getTestRuns = function () {
        $scope.test_run = {};
        testRunService.get().$promise.then(function (response) {
          console.log(response);
          $scope.test_run.list = response.responseObject;
        }).catch(function (error) {
          // $log.error(error);
        });
      };
      getTestRuns();
    }]);
})();