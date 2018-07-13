(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'testRunService', '$uibModal', function ($scope, $rootScope, $state, testRunService, $uibModal) {
      $scope.run_details = {
        'platform': $state.params.platform_id
      };
      console.log($scope.run_details.platform);
      $scope.openTestDetails = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/public/test-run/views/test-case-detail-modal.html',
          // controller: 'testCaseModalCtrl',
          size: 'lg',
          // resolve: {
          //   imageUrl: function () {
          //     return imageUrl;
          //   }
          // }
        });
      };
    }]);
})();