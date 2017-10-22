'use strict';

angular.module('checkout.module').controller('CartCtrl',CartCtrl );

CartCtrl.$inject = ['$scope','$state','$rootScope','$timeout', '$mdBottomSheet', '$mdToast','cartSev','serverConfig','httpService','$httpParamSerializer'];

function CartCtrl($scope,$state,$rootScope, $timeout, $mdBottomSheet, $mdToast,cartSev,serverConfig,httpService,$httpParamSerializer) {

  // $scope.cart = cartSev.shoppingCart.cart;
  // getProductsOfCart();

  if(cartSev.shoppingCart.isEmpty){
    $state.go('home.new');
  }

  $scope.removeItemFromCart = function (product_id) {
    cartSev.shoppingCart.removeItem(product_id);
    removeProductFromCartAPI(product_id);
    if(cartSev.shoppingCart.isEmpty){
      $state.go('home.new');
    }
  };

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

  $scope.updateCart = function (product,type) {
    if(type=='minus'){
      product.quantity = product.quantity > 1 ? product.quantity -= 1 : product.quantity;
    }else if(type=='plus'){
      product.quantity += 1;
    }
    var extended_url = '/cart/edit';
    var reqObj = {
      "key" : product.cart_id,
      "quantity" : product.quantity,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        getProductsOfCart();
      }
    });
  };

  function removeProductFromCartAPI(cart_id) {
    var extended_url = '/cart/remove';
    var reqObj = {
      "key": cart_id
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        for(var i in $scope.cart.products){
          if($scope.cart.products[i].cart_id==cart_id){
            $scope.cart.products.splice(i,1);
            break;
          }
        }
        getProductsOfCart();
      }
    });
  }

  $scope.alert = '';

  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      template:
        '<md-bottom-sheet class="md-list md-has-header">'+
        '<md-subheader ng-cloak>Comment Actions</md-subheader>'+
        '<md-list ng-cloak>'+
        '<md-list-item ng-repeat="item in items">'+
          '<md-button ng-click="listItemClick($index)" md-autofocus="$index == 2" class="md-list-item-content" >'+
        '<md-icon md-svg-src="{{item.icon}}"></md-icon>'+
        '<span class="md-inline-list-icon-label">{{ item.name }}</span>'+
        '</md-button>'+
        '</md-list-item>'+
        '</md-list>'+
      '</md-bottom-sheet>'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    }).catch(function(error) {
      // User clicked outside or hit escape
    });
  };



}

