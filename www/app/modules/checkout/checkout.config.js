'use strict';

var checkoutModule = angular.module('checkout.module',[]);

checkoutModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'app/modules/checkout/templates/cart.html',
      controller: 'CartCtrl'
    })
});
