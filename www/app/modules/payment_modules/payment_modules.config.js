'use strict';

angular.module('payments.module')
    .config(function config($stateProvider) {
        $stateProvider.state('payment_modules', {
            url: '/payment_modules',
            abstract: true,
            views: {
                'tab-cart': {
                    templateUrl: 'app/modules/payment_modules/templates/layout.html'
                },
                'menu': {
                    templateUrl: 'app/modules/payment_modules/templates/layout.html'
                }
            },
            params: { checkout: null, currency: null, total_amount: null, total_amount_clean: null, success_state: null }
        })
    });
