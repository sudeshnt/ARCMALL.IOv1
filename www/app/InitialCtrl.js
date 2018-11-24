'use strict';

angular.module('arcMall').controller('InitialCtrl',InitialCtrl);

InitialCtrl.$inject = ['$scope','$rootScope','$state','$ionicHistory','$ionicLoading','serverConfig','httpService','$httpParamSerializer','cartSev'];

function InitialCtrl($scope,$rootScope,$state,$ionicHistory,$ionicLoading,serverConfig,httpService,$httpParamSerializer,cartSev) {

  $rootScope.$on('$stateChangeStart', function (event,toState,toParams, fromState, fromParams) {
    $ionicLoading.show({
      template: '<ion-spinner icon="circles"></ion-spinner>',
      hideOnStateChange: true
    });
    //when the state changes all pending $http requests will be cancelled
    // pendingRequests.cancelAll();
    // init loginStatus
    if(!$rootScope.loginStatus || $rootScope.authResponse==null  || $rootScope.authResponse=='null' || $rootScope.authResponse=='' || $rootScope.authResponse==undefined || $rootScope.authResponse=='undefined'){
      var localAuthStatus = localStorage.getItem('loginStatus');
      //console.log(localAuthStatus);
      if(localAuthStatus==null || localAuthStatus=='' || localAuthStatus==undefined){
        $scope.logOut(event,toState);
      }else if(JSON.parse(localAuthStatus)==true){
        var localAuthResponse = localStorage.getItem('authResponse');
        if(localAuthResponse!=null && localAuthResponse!='null' && localAuthResponse!='' && localAuthResponse!=undefined && localAuthResponse!='undefined'){
          if(JSON.parse(localAuthResponse)!=null && JSON.parse(localAuthResponse)!='' && JSON.parse(localAuthResponse)!=undefined){
            if(true){
              // if(checkAuthUser(JSON.parse(localStorage.getItem('authResponse')))){
              $rootScope.loginStatus = true;
              $rootScope.authResponse = JSON.parse(localAuthResponse);
            }else{
              $scope.logOut(event,toState);
            }
          }else{
            $scope.logOut(event,toState);
          }
        }else{
          $scope.logOut(event,toState);
        }
      }else{
        $scope.logOut(event,toState);
      }
    }

  });

  $rootScope.$on('$stateChangeSuccess', function () {
    initCartItemCount();
    // $rootScope.cartItemCount = cartSev.shoppingCart.cart.itemList.length;
  });

  //get cart item count
  function initCartItemCount() {
    var extended_url = '/cart/products';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        for(var i in response.data.totals){
          if(response.data.totals[i].title == "Total"){
            response.data.total = response.data.totals[i].text
          }
        }
        $rootScope.cart = response.data;
        $rootScope.cartItemCount = response.data.products.length;
      }
    });
  }

  function checkAuthUser(authResponse){
    return authResponse.shopId != undefined && authResponse.shopId != null && authResponse.shopId != ''
      && authResponse.branchId != undefined && authResponse.branchId != null && authResponse.branchId != ''
      && authResponse.sessionId != undefined && authResponse.sessionId != null && authResponse.sessionId != ''
  }

  $scope.logOut = function(event,toState){
    localStorage.setItem('loginStatus',false);
    localStorage.setItem('authResponse',null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    // if (toState.name !== 'authSignIn') {
    // $ionicHistory.clearHistory();
    // $ionicHistory.clearCache();
    // $state.go('authSignIn');
    // event.preventDefault();
    // }
  }

  $scope.viewCart = function () {
    // if(cartSev.shoppingCart.isEmpty==false){
      $state.go('cart');
    // }
  }
}
