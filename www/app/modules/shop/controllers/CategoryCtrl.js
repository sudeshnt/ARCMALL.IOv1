'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope','httpService','serverConfig'];

function CategoryCtrl($scope,$state,$rootScope,httpService,serverConfig) {

  function getAllCategories() {
    var extended_url = '/category/all';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        // $scope.tabs = response.data.categories;
      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  $scope.tabs = [
    {"text" : "ALL"},
    {"text" : "MEN"},
    {"text" : "WOMEN"},
    {"text" : "KIDS"},
    {"text" : "ACCESSORIES"},
    {"text" : "SUITS"}
  ];
  $scope.goHome = function () {
    $state.go('home.new');
  };
  $scope.goToItems = function () {
    $state.go('item-list');
  };

  init();

  function init() {
    getAllCategories();
  }
}
