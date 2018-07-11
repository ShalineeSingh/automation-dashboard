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
        .state('main.app.basic.dashboard.detail', {
          url: 'dashboard',
          views: {
            'dashboardContent': {
              templateUrl: '/public/dashboard/views/dashboard.html',
              // controller: 'landingController'
            }
          }
        });
    }]);
})();