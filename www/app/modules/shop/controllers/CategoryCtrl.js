'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope'];

function CategoryCtrl($scope,$state,$rootScope) {
  $scope.tabs = [
    {"text" : "Home"},
    {"text" : "Games"},
    {"text" : "Mail"},
    {"text" : "Car"},
    {"text" : "Profile"},
    {"text" : "Favourites"}
  ];
  $scope.goHome = function () {
    $state.go('home.new');
  };
  $scope.goToItems = function () {
    $state.go('item-list');
  };
}
