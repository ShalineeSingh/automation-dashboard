(function () {
  'use strict';
  angular.module('automation.app')
    // .factory('testRunService', ['$resource', 'CONF',function ($resource, CONF) {
    //   return $resource(CONF.URL + '/testrun/list');
    // }])
    // .factory('runDetailsService', ['$resource', 'CONF',function ($resource, CONF) {
    //   return $resource(CONF.URL + '/testrun/:platform/:run_id');
    // }])
    // .factory('releaseListService', ['$resource','CONF', function ($resource, CONF) {
    //   return $resource(CONF.URL + '/testrun/releases');
    // }])
    // .factory('dashboardService', ['$resource','CONF', function ($resource, CONF) {
    //   return $resource(CONF.URL + '/dashboard/history');
    // }]);
    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('/public/test-run/json/test-runs.json');
    }])
    .factory('runDetailsService', ['$resource', function ($resource) {
      return $resource('/public/test-run/json/run-details.json');
    }])
    .factory('releaseListService', ['$resource', function ($resource) {
      return $resource('/public/test-run/json/release-list.json');
    }])
    .factory('dashboardService', ['$resource', function ($resource) {
      return $resource('/public/test-run/json/dashboard.json');
    }]);
})();