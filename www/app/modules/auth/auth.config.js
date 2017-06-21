'use strict';

var authModule = angular.module('auth.module',[]);

authModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('authHome', {
      url: '/authHome',
      templateUrl: 'app/modules/auth/templates/auth-home.html',
      controller: 'AuthHomeCtrl'
    })
    .state('authSignIn', {
      url: '/authSignIn',
      templateUrl: 'app/modules/auth/templates/auth-sign-in.html',
      controller: 'AuthSignInCtrl'
    })
    .state('authSignUp', {
      url: '/authSignUp',
      templateUrl: 'app/modules/auth/templates/auth-sign-up.html',
      controller: 'AuthSignUpCtrl'
    })
    $urlRouterProvider.otherwise('/authHome');
});
