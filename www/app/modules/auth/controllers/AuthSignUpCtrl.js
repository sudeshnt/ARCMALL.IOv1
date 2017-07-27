'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig','httpService','serverConfig'];

function AuthSignUpCtrl($scope,$rootScope,$state,$stateParams,appConfig,httpService,serverConfig) {

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
    'firstname': 'sudesh',
    'lastname': 'nimesha',
    'email': 'sudeshnt93@live.com',
    'password': '444444',
    'confirm': '444444'
  };

  $scope.signUp = function () {
    var extended_url = '/user_register';
    var req = angular.copy($scope.user) ;
    httpService.postRequest(serverConfig.clientAPI, extended_url, req, {}).then(function (response) {
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
