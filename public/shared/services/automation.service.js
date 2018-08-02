(function () {
  'use strict';
  angular.module('automation.app')
    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('http://94ef0f81.ngrok.io/testrun/list');
    }])
    .factory('runDetailsService', ['$resource', function ($resource) {
      return $resource('http://94ef0f81.ngrok.io/testrun/:platform/:run_id');
    }])
    .factory('releaseListService', ['$resource', function ($resource) {
      return $resource('http://94ef0f81.ngrok.io/testrun/releases');
    }])
    .factory('dashboardService', ['$resource', function ($resource) {
      return $resource('http://94ef0f81.ngrok.io/dashboard/history');
    }]);
  // .factory('testRunService', ['$resource', function ($resource) {
  //   return $resource('/public/test-run/json/test-runs.json');
  // }])
  // .factory('runDetailsService', ['$resource', function ($resource) {
  //   return $resource('/public/test-run/json/run-details.json');
  // }])
  // .factory('releaseListService', ['$resource', function ($resource) {
  //   return $resource('/public/test-run/json/release-list.json');
  // }])
  // .factory('dashboardService', ['$resource', function ($resource) {
  //   return $resource('/public/test-run/json/dashboard.json');
  // }]);
})();