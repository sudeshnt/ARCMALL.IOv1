'use strict';

angular.module('shop.module').controller('ItemCtrl',ItemCtrl );

ItemCtrl.$inject = ['$scope','$state','$rootScope','$filter'];

function ItemCtrl($scope,$state,$rootScope,$filter) {
    $scope.openCartPage = function () {
      $state.go('cart');
    }

  $scope.groups = [
    {
      name: $filter('translate')('DESCRIPTION'),
      show: false
    },{
      name: $filter('translate')('REVIEWS'),
      show: false
    },
    {
      name: $filter('translate')('SHIPPING_INFORMATION'),
      show: false
    },
    {
      name: $filter('translate')('RETURN_POLICY'),
      show: false
    }
  ];
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if(!group.show){
      hideAllGroups();
    }
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
  function hideAllGroups() {
    for(var i in $scope.groups){
      $scope.groups[i].show = false;
    }
  }
}
