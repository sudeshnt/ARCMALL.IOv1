'use strict';

angular.module('shop.module').controller('ViewOrderHistoryCtrl',ViewOrderHistoryCtrl );

ViewOrderHistoryCtrl.$inject = ['$scope','$state','$stateParams','$rootScope','$mdSidenav','$log'];

function ViewOrderHistoryCtrl($scope,$state,$stateParams,$rootScope,$mdSidenav,$log) {
  // console.log($stateParams.order);

  if($stateParams.order){
    $scope.order = $stateParams.order;
  }else{
    $state.go('order-history');
  }

  $scope.goBack = function () {
    $state.go('order-history');
  };

}
