'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig'];

function AuthSignUpCtrl($scope,$rootScope,$state,$stateParams,appConfig) {

  $scope.appConfig = appConfig;
  if($stateParams.account_type!==null){
    $scope.selectedAccountType = $stateParams.account_type;
  }else{
    $state.go('selectAccountRole');
  }

  $scope.goBack = function () {
    $state.go('selectAccountRole');
  };

}
