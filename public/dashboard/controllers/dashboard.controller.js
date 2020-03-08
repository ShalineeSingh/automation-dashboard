(function () {
  'use strict';
  angular.module('app.basic')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$state', '$interval', '$filter', '$compile', 'dashboardService', function ($scope, $rootScope, $state, $interval, $filter, $compile, dashboardService) {
      $rootScope.show_filter = false;
      $scope.dashboard = {
        'platform_sequence': {
          'API': 0,
          'WEB': 1,
          'ANDROID': 2,
          'MOBILEWEB': 3,
          'IOS': 4
        },
        'platform_map': $rootScope.maps.platform_map
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

      var getDashboardData = function () {
        $scope.dashboard.page_loader = true;
        dashboardService.get().$promise.then(function (response) {
          $scope.dashboard.release_data = response.responseObject;
          generateProgressBar();
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.dashboard.page_loader = false;
        });
      };

      $scope.goToState = function (release, platform) {
        $state.go('main.app.basic.platform.id', {
          'release': release,
          'platform': platform
        });
      };
      var generateProgressBar = function () {
        $scope.dashboard.release_data.forEach(function (release) {
          release.releaseStats.forEach(function (obj) {
            obj.completionPercent = (((obj.failed_tests + obj.passed_tests) / obj.total_tests) * 100).toFixed(2);
            var pending = Math.round(((obj.total_tests - (obj.passed_tests + obj.failed_tests)) / obj.total_tests) * 100)
            obj.stacked = {
              'value': [Math.round((obj.passed_tests / obj.total_tests) * 100), Math.round((obj.failed_tests / obj.total_tests) * 100), pending],
              'type': ['success', 'danger']
            };
          });
        });
      };

      $scope.goToLatestRelease = function (release_id) {
        $state.go('main.app.basic.dashboard.release', {
          'release_id': release_id
        });
      };
      getDashboardData();

      // var refresh = $interval(getDashboardData, 20 * 1000);

      // $scope.$on('$destroy', function (e) {
      //   $interval.cancel(refresh);
      // });

    }]);
})();