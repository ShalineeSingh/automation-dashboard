(function () {
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'testRunService', '$uibModal', function ($scope, $rootScope, $state, testRunService, $uibModal) {
      $scope.run_details = {
        'platform': $state.params.platform_id
      };
      $scope.error_details = {
        'active_tab': 'test_steps'
      };
      $scope.run_details.data = {
        "timeStamp": "11-07-2018 08:48:27",
        "responseObject": {
          "testRunDetails": {
            "id": 53,
            "platform": "WEB",
            "suiteName": "Confidence",
            "release": "R4",
            "total_tests": 70,
            "passed_tests": 2,
            "failed_tests": 0,
            "start_time": "2018-07-09T12:28:28.438Z",
            "end_time": "2018-07-09T14:28:28.438Z",
            "android_pref_id": 54,
            "deviceID": "D1",
            "buildID": "B1",
            "deviceName": "Moto X"
          },
          "testCaseResultDetails": [{
              "id": 55,
              "runID": 53,
              "testGroupName": "G1",
              "testCaseName": "Create Event",
              "testData": "data 1",
              "testStatus": "PASS",
              "testSteps": "step 1",
              "errorMessage": "Exception in PaymentPage SelectCreditCardAndCompleteBooking() ::java.lang.Exception: Unable to find page element with Tagname 'orderID'",
              "consoleLogs": "Log 1"
            },
            {
              "id": 58,
              "runID": 53,
              "testGroupName": "G2",
              "testCaseName": "T1",
              "testStatus": "PASS",
              "errorMessage": "",
              "consoleLogs": "C1"
            },
            {
              "id": 59,
              "runID": 53,
              "testGroupName": "G2",
              "testCaseName": "T1",
              "testStatus": "PASS",
              "errorMessage": "",
              "consoleLogs": "C1"
            },
            {
              "id": 60,
              "runID": 53,
              "testGroupName": "G2",
              "testCaseName": "T1",
              "testStatus": "PASS",
              "testSteps": "[Step 1, Step 2]",
              "errorMessage": "",
              "consoleLogs": "C1",
              "start_time": "2018-07-11T11:13:56.297Z",
              "end_time": "2018-07-11T11:13:57.443Z"
            },
            {
              "id": 61,
              "runID": 53,
              "testGroupName": "G2",
              "testCaseName": "T3",
              "testStatus": "FAIL",
              "testSteps": "[Step 1, Step 2]",
              "errorMessage": "",
              "consoleLogs": "C1",
              "start_time": "2018-07-11T12:15:40.046Z",
              "end_time": "2018-07-11T12:15:41.261Z"
            }
          ]
        },
        "apiResponseStatus": "SUCCESS"
      };
      console.log($scope.run_details.platform);
      $scope.openTestDetails = function (test_data) {
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
    }]);
})();