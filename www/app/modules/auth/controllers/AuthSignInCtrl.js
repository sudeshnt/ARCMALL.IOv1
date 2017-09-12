'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope','httpService','serverConfig','$httpParamSerializer'];

function AuthSignInCtrl($scope,$state,$rootScope,httpService,serverConfig,$httpParamSerializer) {
  //console.log('auth sign in');
  $scope.user = {
    'email' : 'sudeshnt93@live.com',
    'password' : '444444'
  };
  $scope.signIn = function () {
    // var extended_url = '/login_mobile';
    var extended_url = '/user_login';
    var req = angular.copy($scope.user);
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url,$httpParamSerializer(req),config).then(function(response){
      if(response.status === 200){
        localStorage.setItem('loginStatus',true);
        localStorage.setItem('authResponse',JSON.stringify(response.customer_info));
        $state.go('home.new');
      }else{
        $scope.error = response.error_warning;
      }
    });

  }

}
