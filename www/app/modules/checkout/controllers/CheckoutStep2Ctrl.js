'use strict';

angular.module('checkout.module').controller('CheckoutStep2Ctrl',CheckoutStep2Ctrl );

CheckoutStep2Ctrl.$inject = ['$scope','$state','$rootScope','$stateParams','serverConfig','httpService','$httpParamSerializer'];

function CheckoutStep2Ctrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer){

  if($stateParams.personal_info){
    $scope.personal_info = $stateParams.personal_info;
  }else{
    $state.go('cart');
  }

  $scope.Object = Object;

  $scope.shippingMethodChanged=function(){
    //console.log($scope.paymentMethods);
    var key = Object.keys(JSON.parse($scope.paymentAndShipping.shipping_method).quote)[0]
    var extended_url = '/shipping/method';
    var reqObj = {
      "shipping_method":JSON.parse($scope.paymentAndShipping.shipping_method).quote[key].code
    };
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

  function paymentMethodChanged(){
    var extended_url = '/payment/method';
    var p_method = $scope.paymentMethods['pp_express'].code;
	$scope.paymentAndShipping.payment_method = p_method;
    
    var reqObj = {
      "payment_method":p_method
    };
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

  $scope.nextStep = function () {
    paymentMethodChanged();
    $state.go('checkout-step-3',{'personal_info':$scope.personal_info,'payment_and_shipping':$scope.paymentAndShipping})
  }

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

          var overlay = document.getElementById("overlay");
          overlay.style.display = 'none';
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
    var overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    $scope.paymentAndShipping = {};
    getShippingMethods();
    getPaymentMethods();
  }

}
