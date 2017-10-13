'use strict';

angular.module('checkout.module').controller('CheckoutStep3Ctrl',CheckoutStep3Ctrl );

CheckoutStep3Ctrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService','$httpParamSerializer'];

function CheckoutStep3Ctrl($scope,$state,$rootScope,serverConfig,httpService,$httpParamSerializer) {

  init();

  function init() {
    getProductsOfCart();
  }

  function getProductsOfCart() {
    var extended_url = '/cart/products';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.cart = response.data;
      }
    });
  }

}
