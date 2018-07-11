(function () {
  'use-strict';
  angular.module('app.basic', ['basic.dashboard', 'basic.platform'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main.app.basic', {
          url: 'app',
          views: {
            'appContent': {
              templateUrl: '/public/basic/views/layout.html',
              // controller: 'landingController'
            }
          }
        });
    }]);
})();