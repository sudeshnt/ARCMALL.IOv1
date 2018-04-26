'use strict';

angular.module('checkout.module').controller('CheckoutStep3Ctrl',CheckoutStep3Ctrl );

CheckoutStep3Ctrl.$inject = ['$scope','$state','$rootScope','$stateParams',
'serverConfig','httpService','$httpParamSerializer', '$ionicPopup'];

function CheckoutStep3Ctrl($scope,$state,$rootScope,$stateParams,
  serverConfig,httpService,$httpParamSerializer, $ionicPopup) {

  // if($stateParams.personal_info){
  //   $scope.personal_info = $stateParams.personal_info;
  // }else{
  //   $state.go('cart');
  // }

  getProductsOfCart();

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

  $scope.confirmOrder = function () {

    

    // $state.go("pp_express");
    // console.log($stateParams);
    //   var extended_url = '/order/add';
    //   var reqObj = {
    //     // "shipping_method":$stateParams.personal_info.shipping_method,
    //     // "payment_method":$stateParams.personal_info.payment_method,
    //     "comment":$stateParams.personal_info.comment?$stateParams.personal_info.comment:"",
    //     "affiliate_id":2,
    //     "order_status_id":2
    //   };
    //   var config = {
    //     headers:{
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   };
    //   httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
    //     console.log(response);
    //     if(response.status === 200 && !response.data.error){
    //       // $state.go('categories');

    //       $state.go("pp_express");

    //     }
    //   });
  }

  function getProductsOfCart() {
    $scope.isCartLoaded = false;
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
        console.log("cart");
        console.log(response.data.products);
        if(response.data.products.length > 0) {
            $scope.isCartLoaded = true;
        }
      }
    });
  }

}
