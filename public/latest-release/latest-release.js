(function () {
  'use-strict';
  angular.module('basic.latest', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main.app.basic.latest', {
          'url': '/',
          'abstract': true,
          'cache': false,
          'views': {
            'basicContent': {
              'template': '<div ui-view="latestContent"></div>'
            }
          },
        })
        .state('main.app.basic.latest.release', {
          url: 'latest-release',
          views: {
            'latestContent': {
              templateUrl: '/public/latest-release/views/latest-release.html',
              controller: 'latestReleaseCtrl'
            }
          }
        });
    }]);
})();