"use strict";

angular.module("seller.module").controller("SellerCtrl", SellerCtrl);

SellerCtrl.$inject = ["$scope", "$state", "$rootScope", "sharedProperties"];

function SellerCtrl($scope, $state, $rootScope, sharedProperties) {
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
