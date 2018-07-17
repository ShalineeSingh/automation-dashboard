(function () {
  'use strict';
  angular.module('automation.app')
    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('http://77bdd491.ngrok.io/testrun/list');
    }])
    .factory('runDetailsService', ['$resource', function ($resource) {
      return $resource('http://77bdd491.ngrok.io/testrun/:platform/:run_id');
    }]);
})();