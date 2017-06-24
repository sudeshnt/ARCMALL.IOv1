'use strict';

var testModule = angular.module('test.module',[]);

testModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('test', {
      url: '/test',
      templateUrl: 'app/modules/test/templates/test.html',
      controller: 'TestCtrl'
    })
});
