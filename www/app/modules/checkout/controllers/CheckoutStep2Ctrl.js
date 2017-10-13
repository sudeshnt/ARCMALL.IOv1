'use strict';

angular.module('checkout.module').controller('CheckoutStep2Ctrl',CheckoutStep2Ctrl );

CheckoutStep2Ctrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService','$httpParamSerializer'];

function CheckoutStep2Ctrl($scope,$state,$rootScope,serverConfig,httpService,$httpParamSerializer){
  $scope.shippingMethods = [
    {
      "code" : 1,
      "main_title" : "Free Shipping",
      "text" : "Free Shipping"
    },
    {
      "code" : 2,
      "main_title" : "Economy Shipping",
      "text" : "Economy Shipping"
    }
  ];
  $scope.paymentMethods = [
    {
      "code" : 1,
      "title" : "Cash",
      "text" : "Cash"
    },
    {
      "code" : 2,
      "title" : "Card",
      "text" : "Card"
    }
  ]

  function getShippingMethods() {

    function getProductsOfCart() {
      var extended_url = '/shipping/methods';
      var reqObj = {};
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          console.log(response);
        }
      });
    }
  }

  function getPaymentMethods() {

    function getProductsOfCart() {
      var extended_url = '/payment/methods';
      var reqObj = {};
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          console.log(response);
        }
      });
    }
  }

  init();

  function init() {
    getShippingMethods();
    getPaymentMethods();
  }

}
