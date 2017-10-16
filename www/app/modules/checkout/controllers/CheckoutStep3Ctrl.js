'use strict';

angular.module('checkout.module').controller('CheckoutStep3Ctrl',CheckoutStep3Ctrl );

CheckoutStep3Ctrl.$inject = ['$scope','$state','$rootScope','$stateParams','serverConfig','httpService','$httpParamSerializer'];

function CheckoutStep3Ctrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer) {

  if($stateParams.personal_info){
    $scope.personal_info = $stateParams.personal_info;
  }else{
    $state.go('cart');
  }

  $scope.confirmOrder = function () {
      console.log($scope.personal_info);
      console.log($rootScope.authResponse);
      var extended_url = '/order/add';
      var reqObj = {
        "shipping_method":"",
        "payment_method":"",
        "comment":$scope.personal_info.comment,
        "affiliate_id":$rootScope.authResponse.customer_id,
      };
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

}
