'use strict';

angular.module('shop.module').controller('ViewOrderHistoryCtrl',ViewOrderHistoryCtrl );

ViewOrderHistoryCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log'];

function ViewOrderHistoryCtrl($scope,$state,$rootScope,$mdSidenav,$log) {

  $scope.goHome = function () {
    $state.go('home.new');
  };

}
