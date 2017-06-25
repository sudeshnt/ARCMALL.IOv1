'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope'];

function CategoryCtrl($scope,$state,$rootScope) {

  $scope.openWishList = function () {
    $state.go('wish-list');
  }

}
