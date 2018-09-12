(function () {
  'use strict';
  angular.module('app.basic')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$state', '$interval', '$filter', '$compile', 'dashboardService', function ($scope, $rootScope, $state, $interval, $filter, $compile, dashboardService) {
      var graph_values = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
      ];

      $rootScope.show_filter = false;
      $scope.dashboard = {
        'chart_colors': [{
            backgroundColor: '#26B99A',
            borderColor: '#26B99A',
          },
          {
            backgroundColor: '#34495E',
            borderColor: '#34495E',
          },
          {
            backgroundColor: '#5a8022',
            borderColor: '#5a8022',
          },
          {
            backgroundColor: '#3498DB',
            borderColor: '#3498DB',
          }, {
            backgroundColor: '#9B59B6',
            borderColor: '#9B59B6',
          }
        ],

        'chart_labels': [],
        'chart_options': {
          'spanGaps': true,
          'responsive': true,
          'maintainAspectRatio': true,
          'scales': {
            'xAxes': [{
              'type': 'category',
              'ticks': {
                'padding': 15
              },
              'gridLines': {
                'drawOnChartArea': false,
                'drawTicks': false
              },
              'scaleLabel': {
                'labelString': 'Release',
                'display': true,
                'fontColor': '#999',
                'fontSize': 12,
              }
            }],
            'yAxes': [{
              'id': 'y-axis-1',
              'type': 'linear',
              'display': true,
              'position': 'left',
              'scaleLabel': {
                'labelString': 'Passed Percentage',
                'display': true,
                'fontColor': '#999',
                'fontSize': 12,
                'padding': 15
              },
              'gridLines': {
                // 'color': '#ffffff',
                'display': true,
                // 'drawBorder': false
              },
              ticks: {
                min: 0,
                max: 100
              }
            }]
          },
          'layout': {
            'padding': {
              'left': 10,
              'right': 5,
              'top': 5,
              'bottom': 5
            }
          },
          'tooltips': {
            'xPadding': 10,
            'yPadding': 10,
            'backgroundColor': '#fff',
            'borderColor': '#ddd',
            'borderWidth': 1,
            'titleFontColor': '#9e9e9e',
            'titleFontSize': 12,
            'titleFontStyle': 'normal',
            'titleMarginBottom': 12,
            'bodyFontColor': '#222',
            'bodyFontSize': 12,
            'bodySpacing': 4,
            callbacks: {
              label: function (tooltipItem, data) {
                const tooltip = data.datasets[tooltipItem.datasetIndex];
                const value = tooltip.data[tooltipItem.index];
                return value ? tooltip.label + ': ' + value : tooltip.label + ': -';
              }
            }
          },
          'legend': {
            'display': true,
            'position': 'top',
            'labels': {}
          },
          elements: {
            line: {}
          }
        },
        'platform_sequence': {
          'API': 0,
          'WEB': 1,
          'ANDROID': 2,
          'MOBILEWEB': 3,
          'IOS': 4
        },
        'platform_map': $rootScope.maps.platform_map,
        'chart_series': ['API', 'Web', 'Android', 'MobileWeb', 'iOS']
      };

      var getGraphValues = function (release_array) {
        release_array.forEach(function (release, index) {
          var release_index = index;
          $scope.dashboard.chart_labels.push(release.release);
          release.releaseStats.forEach(function (platform) {
            if (platform.platformType === 'API')
              graph_values[$scope.dashboard.platform_sequence.API][release_index] = platform.passedPercentage;
            if (platform.platformType === 'WEB')
              graph_values[$scope.dashboard.platform_sequence.WEB][release_index] = platform.passedPercentage;
            if (platform.platformType === 'ANDROID')
              graph_values[$scope.dashboard.platform_sequence.ANDROID][release_index] = platform.passedPercentage;
            if (platform.platformType === 'MOBILEWEB')
              graph_values[$scope.dashboard.platform_sequence.MOBILEWEB][release_index] = platform.passedPercentage;
            if (platform.platformType === 'IOS')
              graph_values[$scope.dashboard.platform_sequence.IOS][release_index] = platform.passedPercentage;
          });
        });
        $scope.dashboard.chart_data = graph_values;
      };

      var getDashboardData = function () {
        $scope.dashboard.page_loader = true;
        dashboardService.get().$promise.then(function (response) {
          $scope.dashboard.release_data = response.responseObject;
          getGraphValues($scope.dashboard.release_data);
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
      $scope.goToLatestRelease = function (release_id) {

      }
      getDashboardData();

      var refresh = $interval(getDashboardData, 20 * 1000);

      $scope.$on('$destroy', function (e) {
        $interval.cancel(refresh);
      });

    }]);
})();