'use strict';

angular.module('seller.module').controller('SellerHomeCtrl',SellerHomeCtrl );

SellerHomeCtrl.$inject = ['$scope', '$state','httpService','serverConfig','$timeout','$mdSidenav','$log'];

function SellerHomeCtrl($scope, $state ,httpService,serverConfig,$timeout,$mdSidenav,$log) {


  $scope.toggleSideBarHome = buildToggler('left');

  $scope.options = [
    {
      "name":'a',
      "value":'a'
    },{
      "name":'b',
      "value":'b'
    },{
      "name":'c',
      "value":'c'
    }
  ]

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
