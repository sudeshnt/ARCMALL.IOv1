'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope','httpService','serverConfig','$httpParamSerializer'];

function AuthSignInCtrl($scope,$state,$rootScope,httpService,serverConfig,$httpParamSerializer) {
  //console.log('auth sign in');
  $scope.user = {
    'email' : '',
    // 'email' : 'harindamail@gmail.com',
    'password' : ''
    // 'password' : 'benzc180'
  };
  $scope.signIn = function () {
    var extended_url = '/user_login';
    var req = angular.copy($scope.user);
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    console.log($scope.user);
    httpService.postRequest(serverConfig.clientAPI,extended_url,$httpParamSerializer(req),config).then(function(response){
      if(response.status === 200){
        localStorage.setItem('loginStatus',true);
        var authResponse = response.data.customer_info;
        authResponse.ispartner = response.data.ispartner;
        localStorage.setItem('authResponse',JSON.stringify(authResponse));
        $state.go('categories');
        // $state.go('home.new');
      }else{
        $scope.error = response.error_warning;
      }
    });

  }

}
