"use strict";

angular.module("shop.module").controller("MyProfileCtrl", MyProfileCtrl);

MyProfileCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "$mdSidenav",
  "$log"
];

function MyProfileCtrl($scope, $state, $rootScope, $mdSidenav, $log) {
  $scope.edit = false;

  $scope.userProfile = angular.copy($rootScope.authResponse);

  $scope.saveProfile = function() {
    $scope.edit = false;
  };

  $scope.goHome = function() {
    $state.go("dashboard");
    // $state.go('home.new');
  };

  $scope.openCategories = function() {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go("categories");
  };
  $scope.openWishList = function() {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go("wish-list");
  };
  $scope.openSignIn = function() {
    $scope.close();
    $state.go("authHome");
  };
  $scope.openOrderHistory = function() {
    $scope.close();
    $state.go("order-history");
  };
  $scope.openAddItem = function() {
    $state.go("sellerHome");
  };
  $scope.openMyProfile = function() {
    $scope.close();
    $state.go("my-profile");
  };
  $scope.logOut = function() {
    $scope.close();
    localStorage.setItem("loginStatus", false);
    localStorage.setItem("authResponse", null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    $state.go("authSignIn");
  };

  $scope.toggleSideBarHome = buildToggler("left");

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }
  $scope.close = function() {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav("left")
      .close()
      .then(function() {
        $log.debug("close RIGHT is done");
      });
  };
}
