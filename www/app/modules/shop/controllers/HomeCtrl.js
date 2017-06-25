'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$rootScope','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast'];

function HomeCtrl($scope,$state,$rootScope,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast) {

  $scope.openCategories = function (){
    $state.go('categories');
  };

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

  $scope.toggleSideBar = buildToggler('right');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };

  var originatorEv;
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
}
