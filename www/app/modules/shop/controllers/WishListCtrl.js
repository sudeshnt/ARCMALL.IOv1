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
    console.log($scope.search.heading_title);

    if($scope.search.heading_title){
      $scope.wishList = filterFilter($scope.initialWishList, $scope.search)
    }else if($scope.search.heading_title == ''){
      $scope.wishList = angular.copy($scope.initialWishList);
    }
    $scope.wishListRows = publicFunc.devideArray($scope.wishList,2)
    console.log($scope.wishListRows);
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:$scope.category_id,product_id:product_id});
  };

  $scope.goHome = function () {
    $state.go('home.new');
  };

  $scope.openCategories = function (){
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('categories');
  };
  $scope.openHome = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('home.new');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authHome');
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
