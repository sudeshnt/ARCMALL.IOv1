"use strict";

angular.module("seller.module").controller("SellerCtrl", SellerCtrl);

SellerCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "sharedProperties",
  "$window"
];

function SellerCtrl($scope, $state, $rootScope, sharedProperties, $window) {
  $scope.role = $window.localStorage.getItem("role");

  $scope.signupbuyer = function() {
    $state.go("signup", {
      role: "buyer"
    });
  };
  $scope.signupseller = function() {
    $state.go("signup", {
      role: "seller"
    });
  };

  $scope.goback = function() {
    $state.go("signin");
  };

  $scope.openSignIn = function() {
    $state.go("signin");
  };
}
