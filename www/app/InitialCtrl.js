'use strict';

angular.module('arcMall').controller('InitialCtrl',InitialCtrl);

InitialCtrl.$inject = ['$scope','$rootScope','$state','$ionicHistory',
'$ionicLoading','serverConfig','httpService','$httpParamSerializer',
'cartSev', '$ionicViewSwitcher', '$cookies'];

function InitialCtrl($scope,$rootScope,$state,$ionicHistory,
  $ionicLoading,serverConfig,httpService,$httpParamSerializer,cartSev, $ionicViewSwitcher, $cookies, $translateProvider) {
  
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


  $rootScope.facebookLogin = function(){
    facebookConnectPlugin.login(["public_profile"], function(userData){
      console.log(userData.authResponse.accessToken);
      serverSignIn(userData.authResponse.accessToken, userData.authResponse.userID, true);
      },
      function loginError (error) {
        console.error(error)
      }
    );
  };

  function serverSignIn(token, isFacebook) {
    var extended_url = '/user_login';
    var req = {};
    req.token = token;
    req.type = isFacebook?2:3;
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    console.log($scope.user);
    httpService.postRequest(serverConfig.clientAPI,extended_url,$httpParamSerializer(req),config).then(function(response){
      if(response.status === 200){
        console.log('response');
        localStorage.setItem('loginStatus',true);
        var authResponse = response.data.customer_info;
        authResponse.ispartner = response.data.ispartner;
        localStorage.setItem('authResponse', JSON.stringify(authResponse));
        $state.go('categories');
        // $state.go('home.new');
      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  $rootScope.googlePlusLogin = function(){
    if(window.plugins.googleplus){
      window.plugins.googleplus.login(
        {
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '866910893661-u4k80k30nn57in7np8faf4g2c5kjdh31', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
        function (obj) {
          var token = obj.idToken;
          serverSignIn(token, false);
        },
        function (msg){
          console.log(msg);
        }
      );
    }
  };

}
