'use strict';

var dashBoardModule = angular.module('dashboard.module', []);

dashBoardModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/modules/dashboard/templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'app/modules/dashboard/templates/dashboard.html',
          controller: 'DashBoardCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/dashboard');
});
