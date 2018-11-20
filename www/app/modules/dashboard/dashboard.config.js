"use strict";

var dashBoardModule = angular.module("dashboard.module", []);

dashBoardModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("dashboard", {
    url: "/dashboard",
    templateUrl: "app/modules/dashboard/templates/dashboard.html",
    controller: "DashBoardCtrl",
    params: { userRole1: null }
  });
  $urlRouterProvider.otherwise("/dashboard");
});
