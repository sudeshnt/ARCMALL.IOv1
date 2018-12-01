"use strict";

angular.module("items.module").controller("ItemsCtrl", ItemsCtrl);

ItemsCtrl.$inject = ["$scope", "$state", "sharedProperties", "$ionicHistory"];

function ItemsCtrl($scope, $state, sharedProperties, $ionicHistory) {
  $scope.categories = sharedProperties.getObject();
  console.log("test scope" + $scope.categories);

  $scope.login = function() {
    console.log("login");
    $state.go("signup");
  };

  $scope.goback = function() {
    $ionicHistory.goBack();
  };

  $scope.goToItems = function(category) {
    $state.go("item-list", {
      category_id: category.category_id
    });
  };
}
