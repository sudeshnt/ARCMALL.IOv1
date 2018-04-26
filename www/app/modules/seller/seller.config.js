'use strict';

var sellerModule = angular.module('seller.module',[]);

sellerModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('sellerHome', {
      url: '/sellerHome',
      templateUrl: 'app/modules/seller/templates/seller-home.html',
      controller: 'SellerHomeCtrl'
    }).state('sellerHome2', {
      url: '/sellerHome2',
      templateUrl: 'app/modules/seller/templates/seller-home-2.html',
      controller: 'SellerHome2Ctrl',
      params: {'product_id':null}
    }).state('sellerProducts', {
      url: '/sellerproducts',
      templateUrl: 'app/modules/seller/templates/seller-products.html',
      controller: 'SellerProductsCtrl',
    })
});
