'use strict';

angular.module('shop.module').controller('ItemListCtrl',ItemListCtrl );

ItemListCtrl.$inject = ['$scope','$state','$rootScope','$stateParams','serverConfig','httpService','$httpParamSerializer','publicFunc'];

function ItemListCtrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer,publicFunc) {

  if($stateParams.category_id || $stateParams.manufacturer_id){
    $scope.category_id = $stateParams.category_id;
    $scope.manufacturer_id = $stateParams.manufacturer_id;
    init();
  }else{
    // $scope.category_id = '483';
    // init();
    $state.go('categories');
  }

  function getProductsByCategory (id) {
    var extended_url = '/category';
    var reqObj = {
      "path":id
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.category = response.data;
        $scope.category.products = publicFunc.devideArray($scope.category.products,2);
      }
    });
  }

  function getProductsByManufacturer(id) {
    console.log("manu");
    
    var extended_url = '/product/getproductsbybrand';
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    var req = {
      'brandid': 8
    }

    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(req), config).then(function(response){
      if(response.status === 200){
        console.log(response.data);
        var array = Object.keys(response.data.products).map(i => response.data.products[i])
        $scope.category = {};
        $scope.category.products = publicFunc.devideArray(array,2);
      }
    });
  }


  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:$scope.category_id,product_id:product_id});
  };


  function init(){
    // initCategory();

    if($scope.category_id != null) {
      getProductsByCategory($scope.category_id);
    }
    else if($scope.manufacturer_id != null) {
      getProductsByManufacturer($scope.manufacturer_id)
    }
  }

}
