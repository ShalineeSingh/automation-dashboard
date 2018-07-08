(function () {
  'use-strict';
  angular.module('app.basic', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main.app.basic', {
          url: 'app',
          views: {
            'basicContent': {
              templateUrl: '/public/basic/views/left-nav.html',
              // controller: 'landingController'
            }
          }
        });
    }]);
})();