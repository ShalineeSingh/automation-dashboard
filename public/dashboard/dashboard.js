(function () {
  'use-strict';
  angular.module('basic.dashboard', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main.app.basic.dashboard', {
          'url': '/',
          'abstract': true,
          'cache': false,
          'views': {
            'basicContent': {
              'template': '<div ui-view="dashboardContent"></div>'
            }
          },
        })
        .state('main.app.basic.dashboard.performance', {
          url: 'dashboard',
          views: {
            'dashboardContent': {
              templateUrl: '/public/dashboard/views/dashboard.html',
            }
          }
        })
        .state('main.app.basic.dashboard.release', {
          url: 'release/:release_id',
          views: {
            'dashboardContent': {
              templateUrl: '/public/dashboard/views/release-data.html',
              controller: 'releaseDataCtrl'
            }
          }
        })
        .state('main.app.basic.dashboard.hotfix', {
          url: 'hotfix',
          views: {
            'dashboardContent': {
              templateUrl: '/public/dashboard/views/dashboard.html',
            }
          }
        });
    }]);
})();