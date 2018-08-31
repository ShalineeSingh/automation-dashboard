(function () {
  'use strict';
  angular.module('basic.platform')
    .controller('runDetailsCtrl', ['$scope', '$rootScope', '$state', 'runDetailsService', '$uibModal', '$filter', '$timeout', function ($scope, $rootScope, $state, runDetailsService, $uibModal, $filter, $timeout) {
      $scope.error_details = {};
      $scope.run_details = {
        'platform': $state.params.platform_id,
        'run_id': $state.params.run_id,
        'env_map': $rootScope.maps.env_map,
        'browser_map': $rootScope.maps.browser_map,
        'status_map': $rootScope.maps.status_map,
        'platform_map': $rootScope.maps.platform_map,
        'page': {
          'current_page': 1,
          'max_size': 10,
          'page_size': 10,
          'sizes': [10, 20, 50]
        },
        'sort': {
          'sort_value': 'status',
        },
        'sortable_column': {
          'status': true
        }
      };
      $rootScope.show_filter = false;
      $scope.getRunDetails = function () {
        $scope.run_details.page_loader = true;
        var params = {
          'sort': $scope.run_details.sort.sort_value + ',' + ($scope.run_details.sort.sort_type ? 'desc' : 'asc'),
          'page': $scope.run_details.page.current_page - 1,
          'size': $scope.run_details.page.page_size,
          'platform': $scope.run_details.platform,
          'run_id': $scope.run_details.run_id
        };
        runDetailsService.get(params).$promise.then(function (response) {
          $scope.run_details.data = response.responseObject;
          $scope.run_details.page.total_items = response.total_elements;
          $scope.run_details.page.max_page = Math.ceil($scope.run_details.page.total_items / $scope.run_details.page.page_size);
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.run_details.page_loader = false;
        });
      };

      $scope.openTestDetails = function (test_data) {
        $scope.error_details.active_tab = (test_data.testStatus === 'FAIL' && $scope.run_details.platform !== 'API') ? 'screenshot' : 'test_steps';
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
        var message;
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
      $scope.openImage = function () {
        $scope.error_details.history_data = test_data;
        var modalInstance = $uibModal.open({
          templateUrl: '/public/test-run/views/image-modal.html',
          scope: $scope,
          size: 'xl',
        });
      };


      /*------------ pagination functions -------------*/
      $scope.gotoPage = function () {
        if ($scope.run_details.page.goto_page_number) {
          if (($scope.run_details.page.goto_page_number > $scope.run_details.page.max_page) || $scope.run_details.page.goto_page_number < 0) {
            $scope.run_details.page.goto_page_number = 1;
          }
          $scope.run_details.page.current_page = $scope.run_details.page.goto_page_number;
          $scope.getRunDetails();
        }
      };
      $scope.changePageSize = function () {
        $scope.run_details.page.current_page = 1;
        $scope.getRunDetails();
        delete $scope.run_details.page.goto_page_number;
      };
      /*----------  Sorting   ----------*/
      $scope.sortRunDetails = function (sort_value) {
        $scope.run_details.sort.sort_value = sort_value;
        $scope.run_details.sortable_column[sort_value] = !$scope.run_details.sortable_column[sort_value];
        $scope.run_details.sort.sort_type = $scope.run_details.sortable_column[sort_value];
        var column_array = Object.keys($scope.run_details.sortable_column);
        column_array.forEach(function (col) {
          if (col !== sort_value) {
            delete $scope.run_details.sortable_column[col];
          }
        });
        $scope.getRunDetails();
      };

      $scope.getRunDetails();
      setInterval($scope.getRunDetails, 20 * 1000);
    }]);
})();