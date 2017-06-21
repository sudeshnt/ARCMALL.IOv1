'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$rootScope'];

function AuthSignInCtrl($scope,$rootScope) {
  console.log('auth sign in');
}
