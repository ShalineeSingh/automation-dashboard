// testRunService

(function () {
  angular.module('basic.platform')
    .controller('testRunCtrl', ['$scope', '$rootScope', '$state', 'testRunService', function ($scope, $rootScope, $state, testRunService) {
      var getTestRuns = function () {
        // $scope.test_run = {};
        testRunService.get().$promise.then(function (response) {
          console.log(response);
          $scope.test_run.list = response.responseObject;
        }).catch(function (error) {
          // $log.error(error);
        });
      };
      // getTestRuns();
      $scope.test_run = {
        list: [{
            "id": 2,
            "platform": "WEB",
            "suiteName": "Sanity",
            "release": "R1",
            "total_tests": 20,
            "passed_tests": 0,
            "failed_tests": 0,
            "start_time": "2018-07-06T10:37:15.083Z",
            "end_time": "2018-07-06T11:37:15.083Z"
          },
          {
            "id": 4,
            "platform": "WEB",
            "suiteName": "Regression",
            "release": "R2",
            "total_tests": 10,
            "passed_tests": 0,
            "failed_tests": 0
          },
          {
            "id": 8,
            "platform": "WEB",
            "suiteName": "Sanity",
            "release": "R2",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0
          },
          {
            "id": 10,
            "platform": "WEB",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0
          },
          {
            "id": 12,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0
          },
          {
            "id": 13,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0
          },
          {
            "id": 14,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0
          },
          {
            "id": 16,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "0013-01-07T05:07:15.000Z",
            "end_time": "0013-01-07T06:07:15.000Z"
          },
          {
            "id": 18,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T14:10:59.135Z",
            "end_time": "2018-07-09T14:10:59.135Z"
          },
          {
            "id": 20,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T14:15:50.826Z",
            "end_time": "2018-07-09T14:15:50.826Z"
          },
          {
            "id": 22,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T14:33:42.214Z",
            "end_time": "2018-07-09T14:33:42.214Z"
          },
          {
            "id": 24,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T15:05:01.532Z",
            "end_time": "2018-07-09T15:05:01.532Z"
          },
          {
            "id": 26,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T15:06:27.394Z",
            "end_time": "2018-07-09T15:06:27.394Z"
          },
          {
            "id": 28,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T15:14:23.901Z",
            "end_time": "2018-07-09T15:14:23.901Z"
          },
          {
            "id": 30,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T15:15:35.893Z",
            "end_time": "2018-07-09T15:15:35.893Z"
          },
          {
            "id": 32,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T15:31:25.243Z",
            "end_time": "2018-07-09T15:31:25.243Z"
          },
          {
            "id": 34,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-08T12:28:28.438Z",
            "end_time": "2018-07-08T14:28:28.438Z"
          },
          {
            "id": 36,
            "platform": "ANDROID",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-08T12:28:28.438Z",
            "end_time": "2018-07-08T14:28:28.438Z"
          },
          {
            "id": 38,
            "platform": "MOBILEWEB",
            "suiteName": "Confidence",
            "release": "R4",
            "total_tests": 70,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z"
          },
          {
            "id": 40,
            "platform": "API",
            "suiteName": "Confidence",
            "release": "R4",
            "total_tests": 70,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z"
          },
          {
            "id": 42,
            "platform": "IOS",
            "suiteName": "Sanity",
            "release": "R3",
            "total_tests": 10,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-08T12:28:28.438Z",
            "end_time": "2018-07-08T14:28:28.438Z"
          },
          {
            "id": 44,
            "platform": "WEB",
            "suiteName": "Confidence",
            "release": "R4",
            "total_tests": 70,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z"
          },
          {
            "id": 53,
            "platform": "WEB",
            "suiteName": "Confidence",
            "release": "R4",
            "total_tests": 70,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z"
          },
          {
            "id": 56,
            "platform": "WEB",
            "suiteName": "Reg",
            "release": "R5",
            "total_tests": 30,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z"
          }
        ],
        "apiResponseStatus": "SUCCESS"
      };

      $scope.openRunDetails = function (platform, run_id) {
        $state.go('main.app.basic.platform.run', {
          'platform_id': platform,
          'run_id': run_id
        });
      };
    }]);
})();