'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$filter','$rootScope','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast','UserService','$ionicActionSheet','$ionicLoading'];

function HomeCtrl($scope,$state,$filter,$rootScope,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast,UserService,$ionicActionSheet,$ionicLoading) {

  $scope.tabs = [
    { index:0, heading: $filter('translate')('WHAT_S_NEW'), route:"#/home/whats-new", tabPage:'whats-new' ,active:true},
    { index:1, heading: $filter('translate')('JUST_FOR_YOU'), route:"#/home/just-for-you", tabPage:'just-for-you',active:false},
    { index:2, heading: $filter('translate')('MOST_TRENDING'), route:"#/home/most-trending", tabPage:'most-trending',active:false}
  ];

  $scope.$on("$stateChangeSuccess", function(event,toState, toParams, fromState, fromParams) {
    switch(toState.name){
      case 'home.whatsNew':
        setActive('whats-new');
        break;
      case 'home.justForYou':
        setActive('just-for-you');
        break;
      case 'home.mostTrending':
        setActive('most-trending');
        break;
    }
  });

  function setActive(activeTab) {
    console.log(activeTab+'-tab');
    for(var i in $scope.tabs){
      if($scope.tabs[i].tabPage === activeTab){
        $scope.tabs[i].active = true;
        $scope.activeTabName = activeTab+'-tab';
      }else{
        $scope.tabs[i].active = false;
        // $scope.activeTabName = '';
      }
    }
  }

  $scope.openCategories = function (){
    $mdSidenav('right').close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
    $mdSidenav('right').close();
    $state.go('wish-list');
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

  // var originatorEv;
  // $scope.openMenu = function($mdOpenMenu, ev) {
  //   originatorEv = ev;
  //   $mdOpenMenu(ev);
  // };

  $scope.user = UserService.getUser();

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
            $ionicLoading.hide();
            $state.go('authHome');
          },
          function(fail){
            $ionicLoading.hide();
          });
      }
    });
  };
}
