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
      params: {'personal_info':null}
    })
    .state('checkout-step-3', {
      cache:false,
      url: '/checkout-step-3',
      templateUrl: 'app/modules/checkout/templates/cart-checkout-step3.html',
      controller: 'CheckoutStep3Ctrl',
      params: {'personal_info':null}
    })

    // .state('payment_modules', {
    //   url: '/payment_modules',
    //   abstract: true,
    //   views: {
    //       'tab-cart': {
    //           templateUrl: 'app/modules/payment_modules/templates/layout.html'
    //       },
    //       'menu': {
    //           templateUrl: 'app/modules/payment_modules/templates/layout.html'
    //       }
    //   },
    //   params: { checkout: null, currency: null, total_amount: null, total_amount_clean: null, success_state: null }
    // }).state('payment_modules.pp_express', {
    //   url: '/pp_express',
    //      abstract: true,
    //      views: {
    //          'paymentsContent': {
    //              templateUrl: 'app/modules/payment_modules/pp_express/templates/layout.html'
    //          }
    //      }
    //  })
     .state('pp_express', {
         url: '/pp_express',
         templateUrl: 'app/modules/checkout/templates/paypal_home.html',
         controller: 'PaymentPPExpressCtrl'
     })
});
