'use strict';

angular.module('auth.module').controller('AuthHomeCtrl',AuthHomeCtrl );

AuthHomeCtrl.$inject = ['$rootScope', '$scope', '$state', '$q', 'UserService', '$ionicLoading','httpService','serverConfig', '$ionicViewSwitcher', '$httpParamSerializer'];

function AuthHomeCtrl($rootScope, $scope, $state, $q, UserService, $ionicLoading,httpService,serverConfig, $ionicViewSwitcher, $httpParamSerializer) {

  $scope.facebookLogin = function(){
    $rootScope.facebookLogin();
  };

  $scope.googlePlusLogin = function(){
    $rootScope.googlePlusLogin();
  };

  $scope.signInPage = function(){
    $ionicViewSwitcher.nextDirection('forward');
    $state.go('authSignIn');
  };

  $scope.registerPage = function(){
    $state.go('authSignUp');
  };

  $scope.selectRolePage = function(){
    $state.go('selectAccountRole');
  };
}
