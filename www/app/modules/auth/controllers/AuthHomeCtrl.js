'use strict';

angular.module('auth.module').controller('AuthHomeCtrl',AuthHomeCtrl );

AuthHomeCtrl.$inject = ['$scope','$state','$rootScope'];

function AuthHomeCtrl($scope,$state,$rootScope) {

  $scope.signInPage = function () {
    $state.go('authSignIn');
  }
  $scope.registerPage = function () {
    $state.go('authSignUp');
  }
}
