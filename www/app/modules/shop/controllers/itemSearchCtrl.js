'use strict';

angular.module('shop.module').controller('ItemSearchCtrl',ItemSearchCtrl );

ItemSearchCtrl.$inject = ['$scope','$state','serverConfig','httpService','$httpParamSerializer','publicFunc', '$timeout'];

function ItemSearchCtrl($scope,$state,serverConfig,httpService,$httpParamSerializer,publicFunc, $timeout) {

  $scope.search = {
      "key" : ''
  };

  var offset = 0;
  var limit = 10;

  var itemsFound = [];

  $scope.searchProduct = function (isPagination) {
    if(!isPagination){
      offset = 0;
      itemsFound = [];
      $scope.productRows = [];
    }
    if($scope.search.key.length>0){
      $scope.moreDataCanBeLoaded = false;
      var extended_url = '/product/search';
      var reqObj = {
        "search":$scope.search.key,
        "tag":"",
        "category_id":"",
        "sub_category":"",
        "sort":"",
        "order":"",
        "page":offset,
        "limit":limit
      };
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          if(response.data.products.length==0 || response.data.products.length<limit){
            $scope.moreDataCanBeLoaded = false;
          }else{
            $scope.moreDataCanBeLoaded = true;
          }

          for(var i in response.data.products){
            itemsFound.push(response.data.products[i]);
          }
          $scope.productRows = publicFunc.devideArray(itemsFound,2);
        }
      });
    }else{

    }
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:null,product_id:product_id});
  };

  $scope.loadMoreLatestProducts = function () {
    offset ++;
    $scope.searchProduct(true);
  }

  $scope.$on('$stateChangeSuccess',
    function onStateSuccess(event, toState, toParams, fromState) {
      $timeout(function() {
        var searchBar = document.getElementById('search-bar');
        searchBar.focus();
      }, 150);
    }
  );

  init();

  function init() {
  }

}
