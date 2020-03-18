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
        events: false,
        animation: {
          duration: 500,
          easing: "easeOutQuart",
          onComplete: function () {
            var ctx = this.chart.ctx;
            // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.font = '12px Verdana';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {

              for (var i = 0; i < dataset.data.length; i++) {
                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                  total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                  mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                  start_angle = model.startAngle,
                  end_angle = model.endAngle,
                  mid_angle = start_angle + (end_angle - start_angle) / 2;

                var x = mid_radius * Math.cos(mid_angle);
                var y = mid_radius * Math.sin(mid_angle);

                ctx.fillStyle = '#000';
                if (Math.round(dataset.data[i] / total * 100) > 0) {
                  var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
                  // ctx.fill Text(dataset.data[i], model.x + x, model.y + y);
                  // Display percent in another line, line break doesn't work for fillText

                  ctx.fillText(percent, model.x + x, model.y + y);
                }
              }
            });
          }
        }
        // onAnimationComplete: function () {
        //   this.showTooltip(this.segments);
        // },
        // tooltipEvents: [],
        // tooltips: {
        //   enabled: true,
        //   mode: 'single',
        //   callbacks: {
        //     label: function (tooltipItem, data) {
        //       var label = data.labels[tooltipItem.index];
        //       var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        //       return label + ': ' + datasetLabel + '%';
        //     }
        //   }
        // },
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