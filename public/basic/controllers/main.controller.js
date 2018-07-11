(function () {
  angular.module('app.basic')
    .controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.temp = "In controller";
      console.log($scope.temp);

      // Get the Sidebar
      var mySidebar = document.getElementById("mySidebar");

      // Get the DIV with overlay effect
      var overlayBg = document.getElementById("myOverlay");

      // Toggle between showing and hiding the sidebar, and add overlay effect
      $scope.w3_open = function () {
        if (mySidebar.style.display === 'block') {
          mySidebar.style.display = 'none';
          overlayBg.style.display = "none";
        } else {
          mySidebar.style.display = 'block';
          overlayBg.style.display = "block";
        }
      };

      // Close the sidebar with the close button
      $scope.w3_close = function () {
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
      };

    }]);
})();