'use strict';

angular.module('shop.module').controller('WishListCtrl',WishListCtrl );

WishListCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log'];

function WishListCtrl($scope,$state,$rootScope,$mdSidenav,$log) {

  $scope.openItemDetails = function(){
    $state.go('item');
  };

  $scope.toggleSideBar = buildToggler('right');

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
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };


}
