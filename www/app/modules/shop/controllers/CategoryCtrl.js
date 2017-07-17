'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope'];

function CategoryCtrl($scope,$state,$rootScope) {
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
}
