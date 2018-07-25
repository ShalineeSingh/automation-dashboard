(function () {
  'use strict';
  angular.module('automation.app')
    // .factory('testRunService', ['$resource', function ($resource) {
    //   return $resource('https://3e196e86.ngrok.io/testrun/list');
    // }])
    // .factory('runDetailsService', ['$resource', function ($resource) {
    //   return $resource('https://3e196e86.ngrok.io/testrun/:platform/:run_id');
    // }]);
    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('/public/test-run/controllers/test-runs.json');
    }])
    .factory('runDetailsService', ['$resource', function ($resource) {
      return $resource('/public/test-run/controllers/run-details.json');
    }]);
})();