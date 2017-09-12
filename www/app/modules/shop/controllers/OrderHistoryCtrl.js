'use strict';

angular.module('shop.module').controller('OrderHistoryCtrl',OrderHistoryCtrl );

OrderHistoryCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log'];

function OrderHistoryCtrl($scope,$state,$rootScope,$mdSidenav,$log) {

  $scope.openItemDetails = function(){
    $state.go('item');
  };
  $scope.openCategories = function (){
    $scope.close();
    $state.go('categories');
  };
  $scope.openHome = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('home.new');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authHome');
  };

  $scope.toggleSideBar = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };


}
