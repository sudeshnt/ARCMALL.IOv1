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
}
