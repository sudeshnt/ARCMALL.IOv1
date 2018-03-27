'use strict';

angular.module('shop.module').controller('SellerProfileCtrl',SellerProfileCtrl );

SellerProfileCtrl.$inject = ['$scope','$state','$stateParams','$rootScope','serverConfig','httpService','$httpParamSerializer','publicFunc'];

function SellerProfileCtrl($scope,$state,$stateParams,$rootScope,serverConfig,httpService,$httpParamSerializer,publicFunc) {

  if($stateParams.product_id && $stateParams.seller_id){
    $scope.product_id = $stateParams.product_id;
    $scope.seller_id = $stateParams.seller_id;
  }else{
    $state.go('categories')
  }

  $scope.moreDataCanBeLoaded = false;
  var latestProductsStart = 0;
  var latestProductsLimit = 10;

  $scope.latestProducts = [];

  function initLatestProducts(){
    $scope.moreDataCanBeLoaded = false;
    var extended_url = '/product/getsellerproducts&customer_id=' + $stateParams.seller_id;
    var reqObj = {
      "start":latestProductsStart,
      "limit":latestProductsLimit,
      "width":200,
      "height":200,
      "customer_id":$stateParams.seller_id,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      disableLoading:true
    };
    httpService.getRequest(serverConfig.clientAPI,extended_url,config).then(function(response){
      if(response.status === 200){
        for(var i in response.data.products){
          $scope.latestProducts.push(response.data.products[i])
        }
        $scope.latestProductRows = publicFunc.devideArray($scope.latestProducts,2);
        if(response.data.products.length==0 || response.data.products.length<latestProductsLimit){
          $scope.moreDataCanBeLoaded = false;
        }else{
          $scope.moreDataCanBeLoaded = true;
        }
      }
    });
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:-1,product_id:product_id});
  };

  $scope.loadMoreLatestProducts = function () {
    latestProductsStart +=  latestProductsLimit;
    initLatestProducts();
  }


  $scope.backToProduct = function () {
    $state.go('item',{product_id:$scope.product_id});
  }

  init();

  function init() {
    initLatestProducts();
  }

}
