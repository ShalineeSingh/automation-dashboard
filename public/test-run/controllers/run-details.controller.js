(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'testRunService', '$uibModal', function ($scope, $rootScope, $state, testRunService, $uibModal) {
      $scope.run_details = {
        'platform': $state.params.platform_id
      };
      $scope.error_details = {
        'active_tab': 'test_steps'
      };
      console.log($scope.run_details.platform);
      $scope.openTestDetails = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/test-case-detail-modal.html',
          scope: $scope,
          size: 'lg',
        });
      };
      $scope.changeTab = function (tab) {
        $scope.error_details.active_tab = tab;
      }
    }]);
})();