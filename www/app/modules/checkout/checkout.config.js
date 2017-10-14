'use strict';

var checkoutModule = angular.module('checkout.module',[]);

checkoutModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      cache:false,
      templateUrl: 'app/modules/checkout/templates/cart.html',
      controller: 'CartCtrl'
    })
    .state('checkout-step-1', {
      cache:false,
      url: '/checkout-step-1',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step1.html',
      controller: 'CheckoutCtrl'
    })
    .state('checkout-step-2', {
      cache:false,
      url: '/checkout-step-2',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step2.html',
      controller: 'CheckoutStep2Ctrl',
      params: {'persoanal_info':null}
    })
    .state('checkout-step-3', {
      cache:false,
      url: '/checkout-step-3',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step3.html',
      controller: 'CheckoutStep3Ctrl'
    })
});
