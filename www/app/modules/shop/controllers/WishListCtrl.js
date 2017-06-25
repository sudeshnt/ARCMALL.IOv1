'use strict';

angular.module('shop.module').controller('WishListCtrl',WishListCtrl );

WishListCtrl.$inject = ['$scope','$state','$rootScope'];

function WishListCtrl($scope,$state,$rootScope) {

  $scope.openItemDetails = function(){
    $state.go('item');
  }

}
