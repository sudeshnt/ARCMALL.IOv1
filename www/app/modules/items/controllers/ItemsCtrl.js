"use strict";

angular.module("items.module").controller("ItemsCtrl", ItemsCtrl);

ItemsCtrl.$inject = [
  "$scope",
  "$state",
  "sharedProperties",
  "httpService",
  "serverConfig",
  "$ionicHistory",
  "$httpParamSerializer"
];

function ItemsCtrl(
  $scope,
  $state,
  sharedProperties,
  httpService,
  serverConfig,
  $ionicHistory,
  $httpParamSerializer
) {
  $scope.categoryObject = sharedProperties.getObject();
  console.log("test scope" + $scope.categoryObject.category_id);
  $scope.name = $scope.categoryObject.name;
  getItem();
  $scope.login = function() {
    console.log("login");
    $state.go("signup");
  };

  $scope.goback = function() {
    $ionicHistory.goBack();
  };

  $scope.goToItems = function(category) {
    console.log("category_id" + category.category_id);
    $state.go("item-list", {
      category_id: category.category_id
    });
  };

  function getItem() {
    console.log("test");

    var extended_url =
      "/category/getbyparent&id=" + $scope.categoryObject.category_id;
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200) {
          $scope.categories = response.data.categories[0];
          console.log("test scope" + response.data.categories[0].name);
        } else {
          alert(response.error_warning);
          $scope.error = response.error_warning;
        }
      });
  }
}
