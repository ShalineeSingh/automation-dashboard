(function () {
  'use strict';
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
          url: '/details?page&sort&size&release&platform&suiteName&env',
          'cache': false,
          dynamic: true,
          views: {
            'platformContent': {
              templateUrl: '/public/test-run/views/test-run.html',
              controller: 'testRunCtrl'
            }
          }
        })
        .state('main.app.basic.platform.run', {
          url: '/:platform_id/:run_id?page&sort&size&release&platform&suiteName&env',
          views: {
            'platformContent': {
              templateUrl: '/public/test-run/views/run-details.html',
              controller: 'runDetailsCtrl'
            }
          }
        });
    }]);
})();