"use strict";

angular.module("items.module").controller("ItemsCtrl", ItemsCtrl);

ItemsCtrl.$inject = ["$scope", "$state", "sharedProperties"];

function ItemsCtrl($scope, $state, sharedProperties) {
  $scope.categories = sharedProperties.getObject();
  console.log("test scope" + $scope.categories);

  $scope.login = function() {
    console.log("login");
    $state.go("signup");
  };

  $scope.goback = function() {
    $state.go("dashboard");
  };

  $scope.goToItems = function(category) {
    $state.go("item-list", {
      category_id: category.category_id
    });
  };
}
