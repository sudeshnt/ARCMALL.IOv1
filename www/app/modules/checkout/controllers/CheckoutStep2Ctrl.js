'use strict';

angular.module('checkout.module').controller('CheckoutStep2Ctrl',CheckoutStep2Ctrl );

CheckoutStep2Ctrl.$inject = ['$scope','$state','$rootScope','$stateParams',
'serverConfig','httpService','$httpParamSerializer', '$ionicPopup'];

function CheckoutStep2Ctrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer, $ionicPopup){

  if($stateParams.personal_info){
    $scope.personal_info = $stateParams.personal_info;
  }else{
    $state.go('cart');
  }

  $scope.Object = Object;

  function showPopup(text) {
    var confirmPopup = $ionicPopup.confirm({
         title: 'Arcmall',
         template: text
      });

      confirmPopup.then(function(res) {
         if(res) {
            // console.log('Sure!');
         } else {
            // console.log('Not sure!');
         }
      });
  }

  $scope.shippingMethodChanged=function(){
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
        if(response.data.error != undefined) {
          showPopup(response.data.error);
        }
      }
    });
  }

  $scope.paymentMethodChanged=function(){
    var extended_url = '/payment/method';
    var reqObj = {
      "payment_method":$scope.paymentAndShipping.payment_method
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        console.log(response);
        if(response.data.error != undefined) {
          showPopup(response.data.error);
        }
      }
    });
  }

  $scope.nextStep = function () {
    var key = Object.keys(JSON.parse($scope.paymentAndShipping.shipping_method).quote)[0];

    console.log("payment");
    console.log($scope.paymentAndShipping.payment_method);
    console.log("shipping");
    console.log(JSON.parse($scope.paymentAndShipping.shipping_method).quote[key].code);

    $scope.personal_info.shipping_method = JSON.parse($scope.paymentAndShipping.shipping_method).quote[key].code;
    $scope.personal_info.payment_method = $scope.paymentAndShipping.payment_method;


    $state.go('checkout-step-3',{
      'personal_info':$scope.personal_info,
    })
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
          if(response.data.error != undefined) {
            showPopup(response.data.error);
          }
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
    $scope.paymentAndShipping = {};
    getShippingMethods();
    getPaymentMethods();
  }

}
