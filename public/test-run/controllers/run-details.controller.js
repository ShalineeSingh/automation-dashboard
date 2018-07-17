(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'runDetailsService', '$uibModal', '$filter', '$timeout', function ($scope, $rootScope, $state, runDetailsService, $uibModal, $filter, $timeout) {
      $scope.error_details = {};
      $scope.run_details = {
        'platform': $state.params.platform_id,
        'run_id': $state.params.run_id,
        'env_map': $rootScope.maps.env_map,
        'browser_map': $rootScope.maps.browser_map,
        'status_map': $rootScope.maps.status_map,
        'platform_map': $rootScope.maps.platform_map
      };
      // $scope.run_details.data = {
      //   "timeStamp": "11-07-2018 08:48:27",
      //   "responseObject": {
      //     "testRunDetails": {
      //       "id": 53,
      //       "platform": "WEB",
      //       "suiteName": "Confidence",
      //       "release": "R4",
      //       "total_tests": 70,
      //       "passed_tests": 2,
      //       "failed_tests": 0,
      //       "start_time": "2018-07-09T12:28:28.438Z",
      //       "end_time": "2018-07-09T14:28:28.438Z",
      //       "android_pref_id": 54,
      //       "deviceID": "D1",
      //       "buildID": "B1",
      //       "deviceName": "Moto X",
      //     },
      //     "testCaseResultDetails": [{
      //         "id": 55,
      //         "runID": 53,
      //         "testGroupName": "G1",
      //         "testCaseName": "Create Event",
      //         "testData": "data 1\ndata 2\n data3",
      //         "testStatus": "PASS",
      //         "testSteps": "Diary Of a Cat and her Meow adventures\nThe human i live with is an idiot.",
      //         "errorMessage": "Exception in PaymentPage SelectCreditCardAndCompleteBooking() ::java.lang.Exception: Unable to find page element with Tagname 'orderID'",
      //         "consoleLogs": "Log 1",
      //         'screenshot': "data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw=="

      //       },
      //       {
      //         "id": 58,
      //         "runID": 53,
      //         "testGroupName": "G2",
      //         "testCaseName": "T1",
      //         "testStatus": "PASS",
      //         "errorMessage": "",
      //         "consoleLogs": "C1",
      //         "testSteps": "Diary Of a Cat and her Meow adventures",
      //       },
      //       {
      //         "id": 59,
      //         "runID": 53,
      //         "testGroupName": "G2",
      //         "testCaseName": "T1",
      //         "testStatus": "PASS",
      //         "errorMessage": "",
      //         "consoleLogs": "C1"
      //       },
      //       {
      //         "id": 60,
      //         "runID": 53,
      //         "testGroupName": "G2",
      //         "testCaseName": "T1",
      //         "testStatus": "PASS",
      //         "testSteps": "[Step 1, Step 2]",
      //         "errorMessage": "",
      //         "consoleLogs": "C1",
      //         "start_time": "2018-07-11T11:13:56.297Z",
      //         "end_time": "2018-07-11T11:13:57.443Z"
      //       },
      //       {
      //         "id": 61,
      //         "runID": 53,
      //         "testGroupName": "G2",
      //         "testCaseName": "T3",
      //         "testStatus": "FAIL",
      //         "testSteps": "[Step 1, Step 2]",
      //         "errorMessage": "",
      //         "consoleLogs": "C1",
      //         "start_time": "2018-07-11T12:15:40.046Z",
      //         "end_time": "2018-07-11T12:15:41.261Z",
      //         'screenshot': "data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw=="

      //       }
      //     ]
      //   },
      //   "apiResponseStatus": "SUCCESS"
      // };

      // runDetailsService
      var getRunDetails = function () {
        $scope.run_details.page_loader = true;
        runDetailsService.get({
          'platform': $scope.run_details.platform,
          'run_id': $scope.run_details.run_id
        }).$promise.then(function (response) {
          $scope.run_details.data = response.responseObject;
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.run_details.page_loader = false;
        });
      };

      $scope.openTestDetails = function (test_data) {
        $scope.error_details.active_tab = test_data.testStatus === 'PASS' ? 'test_steps' : 'screenshot';
        if (test_data.testSteps) {
          test_data.test_steps_array = test_data.testSteps.split("\\n");
        }
        if (test_data.testData) {
          test_data.test_data_array = test_data.testData.split("\\n");
        }
        $scope.error_details.test_data = test_data;
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/test-case-detail-modal.html',
          scope: $scope,
          size: 'lg',
        });
      };
      $scope.openRunHistoryDetails = function (test_data) {
        $scope.error_details.history_data = test_data;
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/test-case-history-modal.html',
          scope: $scope,
          size: 'lg',
        });
      };
      $scope.changeTab = function (tab) {
        $scope.error_details.active_tab = tab;
      };

      $scope.getTimeFromSecs = function (elapsed) {
        if (elapsed >= 0) {
          var diff = {};
          diff.days = Math.floor(elapsed / 86400);
          diff.hours = Math.floor(elapsed / 3600 % 24);
          diff.minutes = Math.floor(elapsed / 60 % 60);
          diff.seconds = Math.floor(elapsed % 60);
          message = diff.days + 'd ' + diff.hours + 'h ' + diff.minutes + 'm ' + diff.seconds + 's';
          message = message.replace(/(?:0. )+/, '');
          return message;
        } else {
          return '-';
        }
      };
      getRunDetails();
      setInterval(getRunDetails, 60 * 1000);
    }]);
})();