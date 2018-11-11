"use strict";

var sellerModule = angular.module("seller.module", []);

sellerModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state("seller", {
    url: "/seller",
    templateUrl: "app/modules/seller/templates/seller.html",
    controller: "SellerCtrl"
  });
  $urlRouterProvider.otherwise("/seller");
});
