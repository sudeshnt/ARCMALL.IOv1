'use strict';

angular.module('shop.module').controller('ItemListCtrl',ItemListCtrl );

ItemListCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log'];

function ItemListCtrl($scope,$state,$rootScope,$mdSidenav,$log) {

  $scope.openItemDetails = function(){
    $state.go('item');
  };

}
