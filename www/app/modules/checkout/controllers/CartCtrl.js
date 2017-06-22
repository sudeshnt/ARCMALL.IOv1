'use strict';

angular.module('checkout.module').controller('CartCtrl',CartCtrl );

CartCtrl.$inject = ['$scope','$state','$rootScope','$timeout', '$mdBottomSheet', '$mdToast'];

function CartCtrl($scope,$state,$rootScope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      template:
        '<md-bottom-sheet class="md-list md-has-header">'+
        '<md-subheader ng-cloak>Comment Actions</md-subheader>'+
        '<md-list ng-cloak>'+
        '<md-list-item ng-repeat="item in items">'+
          '<md-button ng-click="listItemClick($index)" md-autofocus="$index == 2" class="md-list-item-content" >'+
        '<md-icon md-svg-src="{{item.icon}}"></md-icon>'+
        '<span class="md-inline-list-icon-label">{{ item.name }}</span>'+
        '</md-button>'+
        '</md-list-item>'+
        '</md-list>'+
      '</md-bottom-sheet>'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    }).catch(function(error) {
      // User clicked outside or hit escape
    });
  };
}

