"use strict";

var signinModule = angular.module("signin.module", ["ui.router"]);

signinModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("signin", {
    url: "/signin",
    templateUrl: "app/modules/signin/templates/signin.html",
    controller: "SignInCtrl"
  });
  $urlRouterProvider.otherwise("/signin");
});
