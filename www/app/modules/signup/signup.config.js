"use strict";

var signupModule = angular.module("signup.module", []);

signupModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("signup", {
    url: "/signup",
    templateUrl: "app/modules/signup/templates/signup.html",
    controller: "SignUpCtrl",
    params: { role: null }
  });
  $urlRouterProvider.otherwise("/signup");
});
