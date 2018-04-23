'use strict';

angular.module('arcMall').controller('InitialCtrl',InitialCtrl);

InitialCtrl.$inject = ['$scope','$rootScope','$state','$ionicHistory',
'$ionicLoading','serverConfig','httpService','$httpParamSerializer',
'cartSev', '$ionicViewSwitcher', '$cookies'];

function InitialCtrl($scope,$rootScope,$state,$ionicHistory,
  $ionicLoading,serverConfig,httpService,$httpParamSerializer,cartSev, $ionicViewSwitcher, $cookies, $translateProvider) {

  setLanguage(localStorage);
  
  $rootScope.$on('$stateChangeStart', function (event,toState,toParams, fromState, fromParams) {
    $ionicLoading.show({
      template: '<ion-spinner icon="circles"></ion-spinner>',
      hideOnStateChange: true
    });

    $rootScope.cart = {};
    //when the state changes all pending $http requests will be cancelled
    // pendingRequests.cancelAll();
    // init loginStatus
    if(!$rootScope.loginStatus || $rootScope.authResponse==null  || $rootScope.authResponse=='null' || $rootScope.authResponse=='' || $rootScope.authResponse==undefined || $rootScope.authResponse=='undefined'){
      var localAuthStatus = localStorage.getItem('loginStatus');
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
    // initCartItemCount();
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
        localStorage.setItem('cartItemCount',$rootScope.cartItemCount);
      }
    });
  }

  function checkAuthUser(authResponse){
    return authResponse.shopId != undefined && authResponse.shopId != null && authResponse.shopId != ''
      && authResponse.branchId != undefined && authResponse.branchId != null && authResponse.branchId != ''
      && authResponse.sessionId != undefined && authResponse.sessionId != null && authResponse.sessionId != ''
  }

  $scope.logOut = function(event,toState){
    // localStorage.setItem('loginStatus',false);
    // localStorage.setItem('authResponse',null);
    // $rootScope.loginStatus = false;
    // $rootScope.authResponse = null;
    // if (toState.name !== 'authSignIn') {
    // $ionicHistory.clearHistory();
    // $ionicHistory.clearCache();
    // $state.go('authSignIn');
    // event.preventDefault();
    // }
  }

  $scope.viewCart = function () {
    // if(cartSev.shoppingCart.isEmpty==false){
    $ionicViewSwitcher.nextDirection('forward');
    $state.go('cart');
    // }
  }

  function showLoading(){
    $ionicLoading.show({
      template: '<ion-spinner icon="crescent"></ion-spinner>',
      hideOnStateChange: true
    });
  }

  function hideLoading(){
      $ionicLoading.hide();
  }

  $rootScope.logOut = function() {
    var extended_url = '/user_logout';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      disableLoading:false
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, reqObj,config).then(function(response){

      if(response.status === 200){
        localStorage.setItem('loginStatus',false);
        localStorage.setItem('authResponse',null);
        localStorage.setItem('cartItemCount',0);
        $rootScope.loginStatus = false;
        $rootScope.authResponse = null;
        // $window.alert($cookies.get('PHPSESSID'));

        // $cookies.putObject('asd', 'bha', {path: '/'});

        // $cookies.PHPSESSID = undefined;


        var cookies = $cookies.getAll();
        console.log("cookies");
        console.log(cookies);
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });

        localStorage.setItem('loginStatus',false);
        localStorage.setItem('authResponse',null);
        $rootScope.loginStatus = false;
        $rootScope.authResponse = null;
        // if (toState.name !== 'authSignIn') {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go('authHome');
        event.preventDefault();
        // }

      }
    });
  }


  $rootScope.showLoading = showLoading;
  $rootScope.initCartItemCount = initCartItemCount;
  $rootScope.hideLoading = hideLoading;



  function initLanguage(lang) {
    var extended_url = '/language/set';
    var reqObj = {
      'code':lang
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config);
  }

  function setLanguage(localStorage) {
    var lang = window.navigator.userLanguage || window.navigator.language;
    var langCode = "en";

    if(lang && lang != "") {
      lang = lang.substring(0,2);
    }
    else {
      lang = "en";
    }

    var localLang = localStorage.getItem('language');

    if(localLang != lang) {

      localStorage.clear();
      localStorage.setItem('language',lang);

      initLanguage(langCode).then(function(response){
        console.log(response);
      })
    }
  }

}
