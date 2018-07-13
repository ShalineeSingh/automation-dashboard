(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', 'testRunService', '$uibModal', function ($scope, $rootScope, testRunService, $uibModal) {
      $scope.test_details = {};
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