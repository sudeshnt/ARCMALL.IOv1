"use strict";

var signinModule = angular.module("login.module", []);

signinModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("login", {
    url: "/login",
    templateUrl: "app/modules/login/templates/login.html",
    controller: "LoginCtrl"
  });
  $urlRouterProvider.otherwise("/login");
});
