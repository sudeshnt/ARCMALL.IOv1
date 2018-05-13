'use strict';

angular.module('shop.module').controller('WishListCtrl',WishListCtrl );

WishListCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log','publicFunc','filterFilter'];

function WishListCtrl($scope,$state,$rootScope,$mdSidenav,$log,publicFunc,filterFilter) {

  $scope.publicFunc = publicFunc;

  init();

  function init() {
    $scope.search = {};
    initWishList();
  }

  function initWishList() {
    var localWishList = localStorage.getItem('wish_list');
    if(localWishList){
      var wishList = JSON.parse(localStorage.getItem('wish_list'));
      if(wishList && wishList.length > 0){
        $scope.wishList = wishList;
        $scope.initialWishList = angular.copy(wishList);
        $scope.wishListRows = publicFunc.devideArray($scope.wishList,2)
      }
    }
  }

  $scope.searchItem = function () {
    if($scope.search.heading_title){
      $scope.wishList = filterFilter($scope.initialWishList, $scope.search)
    }else if($scope.search.heading_title == ''){
      $scope.wishList = angular.copy($scope.initialWishList);
    }
    $scope.wishListRows = publicFunc.devideArray($scope.wishList,2)
  }

  $scope.removeItemFromWishList = function (product_id) {
    for(var i in $scope.wishList){
      if($scope.wishList[i].product_id == product_id) {
        $scope.wishList.splice(i, 1);
        localStorage.setItem('wish_list',JSON.stringify($scope.wishList));
        break;
      }
    }
    $scope.wishListRows = publicFunc.devideArray($scope.wishList,2)
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:$scope.category_id,product_id:product_id});
  };

  $scope.openCategories = function (){
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('wish-list');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authHome');
  };
  $scope.openOrderHistory = function () {
    $scope.close();
    $state.go('order-history');
  };
  $scope.openAddItem = function () {
    $state.go('sellerHome');
  };
  $scope.openMyProducts = function () {
    $state.go('sellerProducts');
  };
  $scope.openMyProfile = function () {
    $scope.close();
    $state.go('my-profile');
  };
  $scope.openHome = function () {
    $scope.close();
    $state.go('home.new');
  };
  $scope.logOut = function () {
    $rootScope.logOut();
  };
  $scope.openSettings = function () {
    $scope.close();
    $state.go('settings');
  };

  $scope.toggleSideBar = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }

  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };


}
