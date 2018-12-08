"use strict";

var settingsModule = angular.module("settings.module", []);

settingsModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("settings", {
      url: "/settings",
      cache: false,
      templateUrl: "app/modules/settings/templates/settings_main.html",
      controller: "SettingsCtrl"
    })
    .state("languages", {
      url: "/languages",
      cache: false,
      templateUrl: "app/modules/settings/templates/languages.html",
      controller: "LanguagesCtrl"
    });
});
