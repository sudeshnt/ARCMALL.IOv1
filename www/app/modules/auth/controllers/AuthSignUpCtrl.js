'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$mdSidenav','$log'];

function AuthSignUpCtrl($scope,$rootScope,$mdSidenav,$log) {
  console.log('auth sign up');
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

  var originatorEv;
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.getNumber = function(num) {
    return new Array(num);
  }
}
