(function () {
  angular.module('app.basic')
    .controller('mainCtrl', ['$scope', '$rootScope', '$state', '$filter', function ($scope, $rootScope, $state, $filter) {
      $scope.sidebar = false;
      $rootScope.maps = {
        'platform_map': {
          'WEB': 'Web',
          'API': 'API',
          'MOBILEWEB': 'Moblie Web',
          'ANDROID': 'Android',
          'IOS': 'iOS'
        },
        'status_map': {
          'PASS': 'Pass',
          "FAIL": 'Fail'
        },
        'env_map': {
          'PRODUCTION': 'Production',
          'DEV': 'Dev',
          'TESTING1': 'Testing1',
          'TESTING2': 'Testing2',
          'HOTFIX': 'HotFix'
        },
        'browser_map': {
          'CHROME': 'Chrome'
        }
      };

      $rootScope.elapsedTime = function (since_date, to_date) {
        var since = new Date(since_date);
        var to;
        if (to_date) {
          to = new Date(to_date);
        } else {
          to = new Date().getTime();
        }
        var elapsed = (to - since) / 1000;
        var message;

        if (elapsed >= 0) {
          var diff = {};

          diff.days = Math.floor(elapsed / 86400);
          diff.hours = Math.floor(elapsed / 3600 % 24);
          diff.minutes = Math.floor(elapsed / 60 % 60);
          diff.seconds = Math.floor(elapsed % 60);

          if (diff.days >= 1) {
            message = $filter("date")(since, 'MMM d, y h:mm:s a');
          } else {
            message = diff.days + 'd ' + diff.hours + 'h ' + diff.minutes + 'm ' + diff.seconds + 's';
            message = message.replace(/(?:0. )+/, '');
            if (!to_date) {
              message = message + ' ago';
            }
          }
          return message;
        } else {
          return '-';
        }
      };
      $scope.toggleSideBar = function () {
        $scope.sidebar = !$scope.sidebar;
      };
      $scope.toggleFilter = function () {
        $rootScope.filter_overlay = !$rootScope.filter_overlay;
      };
    }]);
})();