'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope'];

function AuthSignInCtrl($scope,$state,$rootScope) {
  console.log('auth sign in');

  $scope.signIn = function () {
    $state.go('home.new');
  }

}
