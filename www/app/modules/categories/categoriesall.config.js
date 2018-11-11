"use strict";

var categoriesallModule = angular.module("categoriesall.module", []);

categoriesallModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("categoriesall", {
    url: "/categoriesall",
    templateUrl: "app/modules/categories/templates/categoriesall.html",
    controller: "CategoriesAllCtrl"
  });
  $urlRouterProvider.otherwise("/categoriesall");
});
