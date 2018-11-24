(function (angular) {
    'use strict';
    

    angular.module('arcMall').factory('PaypalFactory', PaypalFactory);

    PaypalFactory.$inject = ['$q', '$filter', '$timeout', '$ionicPlatform', 'serverConfig'];
    
    function PaypalFactory($q, $filter, $timeout, $ionicPlatform, serverConfig) {
        var init_defer;
 
        var that = {};
 
        /**
        * @ngdoc method
        * @name initPaymentUI
        * @methodOf app.PaypalFactory
        * @description
        * Inits the payapl ui with certain envs.
        * 
        * @returns {object} Promise paypal ui init done
        */
        that.initPaymentUI = function() {
            init_defer = $q.defer();
            $ionicPlatform.ready().then(function() {
 
                var clientIDs = {
                    "PayPalEnvironmentProduction": serverConfig.payPal.payPalProductionId,
                    "PayPalEnvironmentSandbox": serverConfig.payPal.payPalSandboxId
                };
                PayPalMobile.init(clientIDs, that.onPayPalMobileInit);
            });
 
            return init_defer.promise;
        }
 
        /**
        * @ngdoc method
        * @name createPayment
        * @methodOf app.PaypalFactory
        * @param {string|number} total total sum. Pattern 12.23
        * @param {string} name name of the item in paypal
        * @description
        * Creates a paypal payment object 
        *
        * @returns {object} PayPalPaymentObject
        */
        var createPayment = function(total, name) {
            // "Sale  == >  immediate payment
            // "Auth" for payment authorization only, to be captured separately at a later time.
            // "Order" for taking an order, with authorization and capture to be done separately at a later time.
            var payment = new PayPalPayment("" + total, "USD", "" + name, "Sale");
            return payment;
        }
 
        /**
        * @ngdoc method
        * @name configuration
        * @methodOf app.PaypalFactory
        * @description
        * Helper to create a paypal configuration object
        *
        * 
        * @returns {object} PayPal configuration
        */
        var configuration = function() {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({ merchantName: serverConfig.payPal.payPalShopName, merchantPrivacyPolicyURL: serverConfig.payPal.payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: serverConfig.payPal.payPalMerchantUserAgreementURL });
            return config;
        }
 
        that.onPayPalMobileInit = function() {
            $ionicPlatform.ready().then(function() {
                PayPalMobile.prepareToRender(serverConfig.payPal.payPalEnv, configuration(), function() {
                    $timeout(function() {
                        init_defer.resolve();
                    });
                });
            });
        }
 
        /**
        * @ngdoc method
        * @name makePayment
        * @methodOf app.PaypalFactory
        * @param {string|number} total total sum. Pattern 12.23
        * @param {string} name name of the item in paypal
        * @description
        * Performs a paypal single payment 
        *
        * 
        * @returns {object} Promise gets resolved on successful payment, rejected on error 
        */
        that.makePayment = function(total, name) {
            var defer = $q.defer();
            total = $filter('number')(total, 2);
            $ionicPlatform.ready().then(function() {
                PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function(result) {
                    $timeout(function() {
                        defer.resolve(result);
                    });
                }, function(error) {
                    $timeout(function() {
                        defer.reject(error);
                    });
                });
            });
 
            return defer.promise;
        }
 
        /**
        * @ngdoc method
        * @name makeFuturePayment
        * @methodOf app.PaypalFactory
        * @description
        * Performs a paypal future payment 
        * 
        * @returns {object} Promise gets resolved on successful payment, rejected on error 
        */
        that.makeFuturePayment = function(total, name) {
            var defer = $q.defer();
            $ionicPlatform.ready().then(function() {
                PayPalMobile.renderFuturePaymentUI(
                    function(authorization) {
                        defer.resolve(authorization);
                    },
                    function(cancelReason) {
                        defer.reject(cancelReason);
                    });
            });
 
            return defer.promise;
        }
 
        return that;
    };

})(angular);
