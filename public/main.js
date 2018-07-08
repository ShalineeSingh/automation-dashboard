(function () {
  'use strict';
  angular.module('automation', ['ui.router', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'automation.app'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('main', {
            url: '/main',
            abstract: true,
            cache: false,
            template: '<div ui-view="mainContent"></div>',
            controller: 'mainCtrl'
          });
        // if none of the states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/main/app');
        // html5Mode removes #! from url and make the url pretty(normal)
        $locationProvider.html5Mode(true);

      }
    ]);
})();