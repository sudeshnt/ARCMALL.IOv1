'use strict';

angular.module('auth.module').controller('SelectAccountRoleCtrl', SelectAccountRoleCtrl);

SelectAccountRoleCtrl.$inject = ['$scope','$state','appConfig'];

function SelectAccountRoleCtrl($scope,$state,appConfig) {

    $scope.appConfig = appConfig;

    $scope.signUpPage = function (account_type) {
      $state.go('authSignUp',{account_type:account_type});
    }

}
