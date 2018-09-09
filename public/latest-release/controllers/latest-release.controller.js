(function () {
  'use strict';
  angular.module('basic.latest')
    .controller('latestReleaseCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$interval', 'latestReleaseService', function ($scope, $rootScope, $state, $stateParams, $interval, latestReleaseService) {
      $scope.latest_release = {
        'platform_map': $rootScope.maps.platform_map,
        'env_map': $rootScope.maps.env_map,
        'environment_list': Object.keys($rootScope.maps.env_map),
        'platform_list': Object.keys($rootScope.maps.platform_map),
      };
      $scope.labels = ["Passed", "Failed", "Pending"];
      $scope.chart_colors = ['#1ABB9C', '#E74C3C', '#F7F7F7'];
      $scope.options = {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.labels[tooltipItem.index];
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return label + ': ' + datasetLabel + '%';
            }
          }
        },
      }
      $rootScope.filter_overlay = false;
      $rootScope.show_filter = false;

      var init = function () {
        $scope.latestReleaseData();
      };
      /**--------get test runs------------ */
      $scope.latestReleaseData = function () {
        $scope.latest_release.page_loader = true;
        latestReleaseService.get().$promise.then(function (response) {
          $scope.latest_release.list = response.responseObject;
          $scope.latest_release.platform_list = Object.keys($scope.latest_release.list.platformWiseBreakup);
          $scope.latest_release.summary = response.responseObject.releaseSummary.releaseStats;
          generateReleaseProgressBar();
          console.log($scope.latest_release.list);
          generateProgressBar();
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.latest_release.page_loader = false;
        });
      };
      var generateReleaseProgressBar = function () {
        $scope.latest_release.summary.forEach(function (obj) {
          obj.completionPercent = (((obj.failed_tests + obj.passed_tests) / obj.total_tests) * 100).toFixed(2);
          obj.stacked = {
            'value': [Math.round((obj.passed_tests / obj.total_tests) * 100), Math.round((obj.failed_tests / obj.total_tests) * 100)],
            'type': ['success', 'danger']
          };
        });
      };

      var generateProgressBar = function () {
        $scope.latest_release.platform_list.forEach(function (platform) {
          $scope.latest_release.list.platformWiseBreakup[platform].forEach(function (obj) {
            obj.completionPercent = (((obj.failed_tests + obj.passed_tests) / obj.total_tests) * 100).toFixed(2);
            var pending = Math.round(((obj.total_tests - (obj.passed_tests + obj.failed_tests)) / obj.total_tests) * 100)
            obj.stacked = {
              'value': [Math.round((obj.passed_tests / obj.total_tests) * 100), Math.round((obj.failed_tests / obj.total_tests) * 100), pending],
              'type': ['success', 'danger']
            };
          });
        });
      };

      init();

      // var refresh = $interval(init, 20 * 1000);
      // $scope.$on('$destroy', function (e) {
      //   $interval.cancel(refresh);
      // });
    }]);
})();