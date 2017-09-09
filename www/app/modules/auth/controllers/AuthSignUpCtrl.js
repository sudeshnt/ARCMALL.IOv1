'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig','httpService','serverConfig','$httpParamSerializer'];

function AuthSignUpCtrl($scope,$rootScope,$state,$stateParams,appConfig,httpService,serverConfig,$httpParamSerializer) {

  $scope.appConfig = appConfig;
  if ($stateParams.account_type !== null) {
    $scope.selectedAccountType = $stateParams.account_type;
  } else {
    $state.go('selectAccountRole');
  }

  $scope.goBack = function () {
    $state.go('selectAccountRole');
  };

  $scope.user = {
    // 'firstname': 'sudesh',
    // 'lastname': 'nimesha',
    // 'email': 'sudeshnt93@live.com',
    // 'password': '444444',
    // 'confirm': '444444'
  };

  $scope.signUp = function () {
    var extended_url = '/user_register';
    var req = angular.copy($scope.user) ;
    req.tobecomepartner = $scope.selectedAccountType;
    if(req.tobecomepartner == appConfig.accountTypes.SELLER){
      req.shoppartner = $scope.user.companyname;
      delete req.companyname;
    }
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI, extended_url, $httpParamSerializer(req), config).then(function (response) {
      if (response.status === 200 && response.error_warning == "") {
        localStorage.setItem('loginStatus', true);
        localStorage.setItem('authResponse', JSON.stringify(response.customer_info));
        $state.go('home.new');
      } else {
        $scope.error = response.error_warning;
      }
    });

  }
}
