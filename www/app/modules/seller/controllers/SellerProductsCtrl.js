'use strict';

angular.module('seller.module').controller('SellerProductsCtrl',SellerProductsCtrl );

SellerProductsCtrl.$inject = ['$scope','$rootScope', '$state','httpService','serverConfig','$httpParamSerializer','$timeout','$mdSidenav','$log','$cordovaActionSheet','$cordovaDevice','$cordovaFile','$cordovaFileTransfer','$ionicLoading', 'publicFunc'];

function SellerProductsCtrl($scope, $rootScope, $state , httpService, serverConfig,$httpParamSerializer,$timeout,$mdSidenav,$log,$cordovaActionSheet,$cordovaDevice,$cordovaFile,$cordovaFileTransfer,$ionicLoading, publicFunc) {

  init();

  function init() {
      getLatestItems();
  }

  function getLatestItems() {

    var customer = JSON.parse(localStorage.getItem('authResponse'));  
    var extended_url = '/product/getsellerproducts&customer_id=' + customer.customer_id;
    
    httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var newArrivals = response.data.products;
        $scope.items = publicFunc.devideArray(newArrivals,2);
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
