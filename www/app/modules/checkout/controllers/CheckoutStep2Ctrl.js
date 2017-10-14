'use strict';

angular.module('checkout.module').controller('CheckoutStep2Ctrl',CheckoutStep2Ctrl );

CheckoutStep2Ctrl.$inject = ['$scope','$state','$rootScope','$stateParams','serverConfig','httpService','$httpParamSerializer'];

function CheckoutStep2Ctrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer){

  $scope.Object = Object;
  console.log($scope.Object)
  // {{method.quote[Object.keys(method.quote)[0]].text}}
  function getShippingMethods() {
      var extended_url = '/shipping/methods';
      var reqObj = {};
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          $scope.shippingMethods = response.data.shipping_methods;
        }
      });
  }

  function getPaymentMethods() {
      var extended_url = '/payment/methods';
      var reqObj = {};
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          $scope.paymentMethods = response.data.payment_methods;
        }
      });
  }

  init();

  function init() {
    getShippingMethods();
    getPaymentMethods();
  }

}
