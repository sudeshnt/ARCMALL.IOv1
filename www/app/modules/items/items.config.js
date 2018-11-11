"use strict";

var itemsModule = angular.module("items.module", []);

itemsModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("items", {
    url: "/items",
    templateUrl: "app/modules/items/templates/items.html",
    controller: "ItemsCtrl"
  });
  $urlRouterProvider.otherwise("/items");
});
