(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'runDetailsService', '$uibModal', '$filter', '$timeout', function ($scope, $rootScope, $state, runDetailsService, $uibModal, $filter, $timeout) {
      $scope.error_details = {};
      $scope.run_details = {
        'platform': $state.params.platform_id,
        'run_id': $state.params.run_id,
        'env_map': $rootScope.maps.env_map,
        'browser_map': $rootScope.maps.browser_map,
        'status_map': $rootScope.maps.status_map,
        'platform_map': $rootScope.maps.platform_map
      };
      var getRunDetails = function () {
        $scope.run_details.page_loader = true;
        runDetailsService.get({
          'platform': $scope.run_details.platform,
          'run_id': $scope.run_details.run_id
        }).$promise.then(function (response) {
          $scope.run_details.data = response.responseObject;
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.run_details.page_loader = false;
        });
      };

      $scope.openTestDetails = function (test_data) {
        $scope.error_details.active_tab = test_data.testStatus === 'PASS' ? 'test_steps' : 'screenshot';
        if (test_data.testSteps) {
          test_data.test_steps_array = test_data.testSteps.split("\\n");
        }
        if (test_data.testData) {
          test_data.test_data_array = test_data.testData.split("\\n");
        }
        $scope.error_details.test_data = test_data;
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/test-case-detail-modal.html',
          scope: $scope,
          size: 'lg',
        });
      };
      $scope.openRunHistoryDetails = function (test_data) {
        $scope.error_details.history_data = test_data;
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/test-case-history-modal.html',
          scope: $scope,
          size: 'lg',
        });
      };
      $scope.changeTab = function (tab) {
        $scope.error_details.active_tab = tab;
      };

      $scope.getTimeFromSecs = function (elapsed) {
        if (elapsed >= 0) {
          var diff = {};
          diff.days = Math.floor(elapsed / 86400);
          diff.hours = Math.floor(elapsed / 3600 % 24);
          diff.minutes = Math.floor(elapsed / 60 % 60);
          diff.seconds = Math.floor(elapsed % 60);
          message = diff.days + 'd ' + diff.hours + 'h ' + diff.minutes + 'm ' + diff.seconds + 's';
          message = message.replace(/(?:0. )+/, '');
          return message;
        } else {
          return '-';
        }
      };
      getRunDetails();
      setInterval(getRunDetails, 20 * 1000);
    }]);
})();