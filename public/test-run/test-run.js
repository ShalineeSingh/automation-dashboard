(function () {
  'use-strict';
  angular.module('basic.platform', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main.app.basic.platform', {
          'url': '/platform',
          'abstract': true,
          'cache': false,
          'views': {
            'basicContent': {
              'template': '<div ui-view="platformContent"></div>'
            }
          },
        })
        .state('main.app.basic.platform.id', {
          url: '/details?release&platform',
          views: {
            'platformContent': {
              templateUrl: '/public/test-run/views/test-run.html',
              controller: 'testRunCtrl'
            }
          }
        })
        .state('main.app.basic.platform.run', {
          url: '/:platform_id/:run_id',
          views: {
            'platformContent': {
              templateUrl: '/public/test-run/views/run-details.html',
              controller: 'runDetailsCtrl'
            }
          }
        });
    }]);
})();