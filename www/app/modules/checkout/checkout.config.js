'use strict';

var checkoutModule = angular.module('checkout.module',[]);

checkoutModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'app/modules/checkout/templates/cart.html',
      controller: 'CartCtrl'
    })
    .state('checkout-step-1', {
      url: '/checkout-step-1',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step1.html',
      controller: 'CheckoutCtrl'
    })
    .state('checkout-step-2', {
      url: '/checkout-step-2',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step2.html',
      controller: 'CheckoutCtrl'
    })
    .state('checkout-step-3', {
      url: '/checkout-step-3',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step3.html',
      controller: 'CheckoutCtrl'
    })
});
