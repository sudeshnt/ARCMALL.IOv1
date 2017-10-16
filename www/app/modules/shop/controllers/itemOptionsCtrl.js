'use strict';

angular.module('shop.module').controller('itemOptionsCtrl',itemOptionsCtrl );

itemOptionsCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log','publicFunc','filterFilter','$mdBottomSheet'];

function itemOptionsCtrl($scope,$state,$rootScope,$mdSidenav,$log,publicFunc,filterFilter,$mdBottomSheet) {

    $scope.hideBottomSheet = function () {
      $mdBottomSheet.cancel();
    }



}
