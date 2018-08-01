(function () {
  'use strict';
  angular.module('automation.app')
    // .factory('testRunService', ['$resource', function ($resource) {
    //   return $resource('http://b650fa14.ngrok.io/testrun/list');
    // }])
    // .factory('runDetailsService', ['$resource', function ($resource) {
    //   return $resource('http://b650fa14.ngrok.io/testrun/:platform/:run_id');
    // }])
    // .factory('releaseListService', ['$resource', function ($resource) {
    //   return $resource('http://b650fa14.ngrok.io/testrun/releases');
    // }]);

    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('/public/test-run/controllers/test-runs.json');
    }])
    .factory('runDetailsService', ['$resource', function ($resource) {
      return $resource('/public/test-run/controllers/run-details.json');
    }])
    .factory('releaseListService', ['$resource', function ($resource) {
      return $resource('/public/test-run/controllers/release-list.json');
    }]);
})();