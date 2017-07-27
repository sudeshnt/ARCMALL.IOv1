'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope','httpService','serverConfig'];

function AuthSignInCtrl($scope,$state,$rootScope,httpService,serverConfig) {
  //console.log('auth sign in');
  $scope.user = {
    'email' : 'i2cssolutions@gmail.com',
    'password' : '123456'
  };
  $scope.signIn = function () {
    var extended_url = '/user_login';
    var req = angular.copy($scope.user);
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && response.error_warning == ""){
        localStorage.setItem('loginStatus',true);
        localStorage.setItem('authResponse',JSON.stringify(response.customer_info));
        $state.go('home.new');
      }else{
        $scope.error = response.error_warning;
      }
    });
  }

}
