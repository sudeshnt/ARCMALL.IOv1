"use strict";

var sellerModule = angular.module("seller.module", []);

sellerModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state("seller", {
      url: "/seller",
      templateUrl: "app/modules/seller/templates/seller.html",
      controller: "SellerCtrl"
    })
    .state("sellerHome", {
      url: "/sellerHome",
      templateUrl: "app/modules/seller/templates/seller-home.html",
      controller: "SellerHomeCtrl"
    });
  $urlRouterProvider.otherwise("/seller");
});
