(function () {
  angular.module('basic.platform')
    .controller('testRunCtrl', ['$scope', '$rootScope', '$state', 'testRunService', 'releaseListService', function ($scope, $rootScope, $state, testRunService, releaseListService) {
      $scope.test_run = {
        'platform_map': $rootScope.maps.platform_map,
        'env_map': $rootScope.maps.env_map,
        'page': {
          'current_page': 1,
          'max_size': 10,
          'page_size': 10,
          'sizes': [10, 20, 50]
        },
        'sort': {
          'sort_value': 'id',
          'sort_type': 'asc'
        },
        'sortable_column': {
          'id': true
        },
        'environment_list': Object.keys($rootScope.maps.env_map),
        'platform_list': Object.keys($rootScope.maps.platform_map),
        'filter': {
          'platform': $state.params.platform,
          'release': {
            'releaseName': $state.params.release
          }
        }
      };
      $rootScope.filter_overlay = false;
      $rootScope.show_filter = true;

      $scope.getTestRuns = function () {
        $scope.test_run.page_loader = true;
        var params = {
          'sort': $scope.test_run.sort.sort_value + ',' + ($scope.test_run.sort.sort_type ? 'desc' : 'asc'),
          'page': $scope.test_run.page.current_page - 1,
          'size': $scope.test_run.page.page_size,
          'platform': $scope.test_run.filter.platform,
          'release': $scope.test_run.filter.release ? $scope.test_run.filter.release.releaseName : '',
          'suiteName': $scope.test_run.filter.suite_name,
          'env': $scope.test_run.filter.environment
        };
        testRunService.get(params).$promise.then(function (response) {
          $scope.test_run.list = response.responseObject;
          $scope.test_run.page.total_items = response.total_elements;
          $scope.test_run.page.max_page = Math.ceil($scope.test_run.page.total_items / $scope.test_run.page.page_size);
          generateProgressBar();
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          $scope.test_run.page_loader = false;
        });
      };

      $scope.getReleaseList = function () {
        releaseListService.get().$promise.then(function (response) {
          $scope.test_run.release_list = response.responseObject;
        }).catch(function (error) {
          console.log(error);
        });
      };
      var generateProgressBar = function () {
        $scope.test_run.list.forEach(function (obj) {
          obj.completionPercent = (((obj.failed_tests + obj.passed_tests) / obj.total_tests) * 100).toFixed(2);
          obj.stacked = {
            'value': [Math.round((obj.passed_tests / obj.total_tests) * 100), Math.round((obj.failed_tests / obj.total_tests) * 100)],
            'type': ['success', 'danger']
          };
        });
      };

      $scope.openRunDetails = function (platform, run_id) {
        $state.go('main.app.basic.platform.run', {
          'platform_id': platform,
          'run_id': run_id
        });
      };

      /*------------ pagination functions -------------*/
      $scope.gotoPage = function () {
        if ($scope.test_run.page.goto_page_number) {
          if (($scope.test_run.page.goto_page_number > $scope.test_run.page.max_page) || $scope.test_run.page.goto_page_number < 0) {
            $scope.test_run.page.goto_page_number = 1;
          }
          $scope.test_run.page.current_page = $scope.test_run.page.goto_page_number;
          $scope.getTestRuns();
        }
      };
      $scope.changePageSize = function () {
        $scope.test_run.page.current_page = 1;
        $scope.getTestRuns();
        delete $scope.test_run.page.goto_page_number;
      };
      /*----------  Sorting   ----------*/
      $scope.sortTestRuns = function (sort_value) {
        $scope.test_run.sort.sort_value = sort_value;
        $scope.test_run.sortable_column[sort_value] = !$scope.test_run.sortable_column[sort_value];
        $scope.test_run.sort.sort_type = $scope.test_run.sortable_column[sort_value];
        var column_array = Object.keys($scope.test_run.sortable_column);
        column_array.forEach(function (col) {
          if (col !== sort_value) {
            delete $scope.test_run.sortable_column[col];
          }
        });
        $scope.getTestRuns();
      };

      $scope.resetFilters = function () {
        $rootScope.filter_overlay = false;
        delete $scope.test_run.filter;
        $scope.getTestRuns();
      };
      $scope.applyFilters = function () {
        $scope.test_run.page.current_page = 1;
        $scope.getTestRuns();
        $rootScope.filter_overlay = false;
      };
      $scope.getTestRuns();
      $scope.getReleaseList();
      // setInterval(getTestRuns, 20 * 1000);
    }]);
})();