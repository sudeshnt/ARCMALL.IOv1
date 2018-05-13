'use strict';

var checkoutModule = angular.module('settings.module',[]);

checkoutModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('settings', {
      url: '/settings',
      cache:false,
      templateUrl: 'app/modules/settings/templates/settings_main.html',
      controller: 'SettingsCtrl'
    }) 
    .state('languages', {
      url: '/languages',
      cache:false,
      templateUrl: 'app/modules/settings/templates/languages.html',
      controller: 'LanguagesCtrl'
    })
});
