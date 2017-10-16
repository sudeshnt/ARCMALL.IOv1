'use strict';

angular.module('shop.module').controller('OrderHistoryCtrl',OrderHistoryCtrl );

OrderHistoryCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log','serverConfig','httpService','$httpParamSerializer'];

function OrderHistoryCtrl($scope,$state,$rootScope,$mdSidenav,$log,serverConfig,httpService,$httpParamSerializer) {

  init();

  $scope.viewOrderDetails = function(order){
    $state.go('view-order-history',{order:order});
  }

  $scope.goHome = function () {
    $state.go('home.new');
  };

  $scope.openItemDetails = function(){
    $state.go('item');
  };
  $scope.openCategories = function (){
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

  function initOrderHistory(){
    var extended_url = '/order_history';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.orders = response.data.orders;
      }
    });
  }

  function init() {
    initOrderHistory();
  }

}
