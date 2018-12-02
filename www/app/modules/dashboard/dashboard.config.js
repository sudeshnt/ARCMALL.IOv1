"use strict";

var dashBoardModule = angular.module("dashboard.module", ["ui.router"]);

dashBoardModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("dashboard", {
    cache: false,
    url: "/dashboard",
    templateUrl: "app/modules/dashboard/templates/dashboard.html",
    controller: "DashBoardCtrl"
  });
  $urlRouterProvider.otherwise("/dashboard");
});
