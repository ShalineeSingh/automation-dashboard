(function () {
  angular.module('app.basic')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$filter', function ($scope, $rootScope, $filter) {
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
      // $scope.dashboard_colors = ['#1ABB9C', '#2A3F54'];
      // $scope.dashboard_colors = ["#96CA59", "#3F97EB", "#72c380", "#6f7a8a", "#f7cb38", "#5a8022", "#2c7282"];

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
    }]);
})();