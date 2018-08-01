(function () {
  angular.module('app.basic')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$state', '$filter', function ($scope, $rootScope, $state, $filter) {
      $scope.dashboard = {
        'release_data': [{
          'version': '1.5',
          'web': 45,
          'android': 56,
          'api': 34,
          'mobileweb': 65,
          'ios': 89
        }, {
          'version': '1.5',
          'web': 45,
          'android': 56,
          'api': 34,
          'mobileweb': 65,
          'ios': 89
        }, {
          'version': '1.5',
          'web': 45,
          'android': 56,
          'api': 34,
          'mobileweb': 65,
          'ios': 89
        }, {
          'version': '1.5',
          'web': 45,
          'android': 56,
          'api': 34,
          'mobileweb': 65,
          'ios': 89
        }, {
          'version': '1.5',
          'web': 45,
          'android': 56,
          'api': 34,
          'mobileweb': 65,
          'ios': 89
        }]
      };
      $rootScope.show_filter = false;

      $scope.dashboard_colors = ["#26B99A", "#34495E", "#5a8022", "#3498DB", "#9B59B6", "#8abb6f", "#759c6a", "#bfd3b7"];
      $scope.labels = ["Release 1", "Release 2", "Release 3", "Release 4", "Release 5"];
      $scope.series = ['Web', 'Android', 'API', 'MobileWeb', 'iOS'];
      $scope.data = [
        [65, 59, 80, 81, 56],
        [68, 48, 40, 19, 86],
        [48, 44, 40, 49, 46],
        [45, 76, 43, 45, 86],
        [58, 45, 46, 45, 65]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
      }];
      $scope.options = {
        'responsive': true,
        'maintainAspectRatio': true,
        'layout': {
          'padding': {
            'left': 5,
            'right': 5,
            'top': 5,
            'bottom': 5
          }
        },
        'tooltips': {
          // 'mode': 'nearest',
          'axis': 'x',
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
          bodySpacing: 4
        },
        'legend': {
          'display': true,
          'position': 'top',
          'labels': {
            'usePointStyle': true,
          }
        },
        scales: {
          yAxes: [{
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }]
        },
        elements: {
          line: {
            // fill: false,
            //  tension: 0,
          }
        }
      };
      $scope.goToState = function (release, platform) {
        $state.go('main.app.basic.platform.id', {
          'release': release,
          'platform': platform
        });
      };
    }]);
})();