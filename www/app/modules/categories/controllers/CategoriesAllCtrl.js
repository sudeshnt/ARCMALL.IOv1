"use strict";

angular
  .module("categoriesall.module")
  .controller("CategoriesAllCtrl", CategoriesAllCtrl);

CategoriesAllCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "httpService",
  "serverConfig",
  "sharedProperties",
  "$ionicLoading"
];

function CategoriesAllCtrl(
  $scope,
  $state,
  $rootScope,
  httpService,
  serverConfig,
  sharedProperties,
  $ionicLoading
) {
  $scope.goback = function() {
    $state.go("dashboard");
  };

  $scope.login = function() {
    console.log("login");
    $state.go("signup");
  };

  $scope.showLoading = function() {
    console.log("loading");
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner>',
      hideOnStateChange: true
    });
  };

  $scope.hideLoading = function() {
    console.log("hide");
    $ionicLoading.hide();
  };

  $scope.goTo = function(category) {
    sharedProperties.setObject(category);
    $scope.categoryList = sharedProperties.getObject();
    console.log($scope.categoryList);

    $state.go("items");
  };
  $scope.array = ["rajitha", "perera"];

  getAllCategories();

  function getAllCategories() {
    $scope.showLoading();
    var extended_url = "/category/all";
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200) {
          console.log(response.data);

          $scope.allCategories = response.data.categories[0].categories;
          console.log($scope.allCategories);
          $scope.hideLoading();
        } else {
          $scope.error = response.error_warning;
        }
      });
  }
}
