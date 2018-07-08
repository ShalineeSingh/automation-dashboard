(function () {
  'use-strict';
  angular.module('automation.app', ['app.basic'])
    .config(['$stateProvider',
      function ($stateProvider) {
        $stateProvider.state('main.app', {
          url: '/',
          abstract: true,
          cache: false,
          'ncyBreadcrumb': {
            'skip': true
          },
          views: {
            'mainContent': {
              template: '<div ui-view="basicContent"></div>'
            }
          }
        });
      }
    ]);
})();