(function () {
  'use strict';
  angular.module('automation.app')
    .factory('testRunService', ['$resource', function ($resource) {
      return $resource('http://f82f5a86.ngrok.io/testrun/list');
    }]);
})();