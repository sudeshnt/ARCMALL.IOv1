'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope'];

function CategoryCtrl($scope,$state,$rootScope) {

  $scope.goHome = function () {
    $state.go('home.whatsNew');
  };
  $scope.goToItems = function () {
    $state.go('item-list');
  };
}
