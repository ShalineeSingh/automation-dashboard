// testRunService

(function () {
  angular.module('basic.platform')
    .controller('testRunCtrl', ['$scope', '$rootScope', '$state', 'testRunService', function ($scope, $rootScope, $state, testRunService) {
      $scope.test_run = {
        'platform_map': $rootScope.maps.platform_map,
        'env_map': $rootScope.maps.env_map
      };
      var getTestRuns = function () {
        $scope.test_run.page_loader = true;
        testRunService.get().$promise.then(function (response) {
          $scope.test_run.list = response.responseObject;
          generateProgressBar();
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.test_run.page_loader = false;
        });
      };
      var generateProgressBar = function () {
        $scope.test_run.list.forEach(function (obj) {
          obj.completionPercent = (((obj.failed_tests + obj.passed_tests) / obj.total_tests) * 100).toFixed(2);
          obj.stacked = {
            'value': [Math.round((obj.passed_tests / obj.total_tests) * 100), Math.round((obj.failed_tests / obj.total_tests) * 100)],
            'type': ['success', 'danger']
          };
        });
      };

      $scope.openRunDetails = function (platform, run_id) {
        $state.go('main.app.basic.platform.run', {
          'platform_id': platform,
          'run_id': run_id
        });
      };
      getTestRuns();
      setInterval(getTestRuns, 20 * 1000);
    }]);
})();