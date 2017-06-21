'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope'];

function AuthSignUpCtrl($scope,$rootScope) {
  console.log('auth sign up');
}
