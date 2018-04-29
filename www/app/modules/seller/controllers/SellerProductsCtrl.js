'use strict';

angular.module('seller.module').controller('SellerProductsCtrl',SellerProductsCtrl );

SellerProductsCtrl.$inject = ['$scope','$rootScope', '$state','httpService','serverConfig','$httpParamSerializer','$timeout','$mdSidenav','$log','$cordovaActionSheet','$cordovaDevice','$cordovaFile','$cordovaFileTransfer','$ionicLoading', 'publicFunc'];

function SellerProductsCtrl($scope, $rootScope, $state , httpService, serverConfig,$httpParamSerializer,$timeout,$mdSidenav,$log,$cordovaActionSheet,$cordovaDevice,$cordovaFile,$cordovaFileTransfer,$ionicLoading, publicFunc) {

  init();

  function init() {
      getLatestItems();
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:null,product_id:product_id});
  };

  function getLatestItems() {

    var customer = JSON.parse(localStorage.getItem('authResponse'));  
    var extended_url = '/product/getsellerproducts';

    var reqObj = {
      'customer_id': customer.customer_id
    }

    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj) , config).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var array = Object.keys(response.data.products).map(i => response.data.products[i])
        $scope.items = publicFunc.devideArray(array,2);
        hideLoading();

      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  function hideLoading() {
    // if(isCartLoaded == true && isViewsLoaded == true) {

      $scope.SyncIsCompleted = true;
      $rootScope.hideLoading();
    // }
  }

}
