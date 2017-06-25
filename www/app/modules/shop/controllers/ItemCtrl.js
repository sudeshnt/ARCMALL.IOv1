'use strict';

angular.module('shop.module').controller('ItemCtrl',ItemCtrl );

ItemCtrl.$inject = ['$scope','$state','$rootScope'];

function ItemCtrl($scope,$state,$rootScope) {
    $scope.openCartPage = function () {
      $state.go('cart');
    }
}
