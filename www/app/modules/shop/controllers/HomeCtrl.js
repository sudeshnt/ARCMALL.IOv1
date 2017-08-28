'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$filter','$rootScope','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast','UserService','$ionicActionSheet','$ionicLoading','serverConfig','httpService'];

function HomeCtrl($scope,$state,$filter,$rootScope,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast,UserService,$ionicActionSheet,$ionicLoading,serverConfig,httpService) {

  $scope.activeTabName = null;

  $scope.tabDetails = {
    "NEW":{"name":"NEW"},
    "USED":{"name":"USED"},
    "WHOLESALE":{"name":"WHOLESALE"}
  };

  init();

  function init() {

  }


  var extended_url = '/category/all';
  httpService.postRequest(serverConfig.clientAPI,extended_url,{},{}).then(function(response){
    if(response.status === 200){
      var tabName = '';
      for(var i in response.data.categories){
        tabName = response.data.categories[i].name.split(" ")[0].toUpperCase();
        $scope.tabDetails[tabName] = response.data.categories[i];
        // getProductsByCategory(response.data.categories[i].category_id);
      }
      $scope.newCategories = $scope.getCategoryRows("NEW",2);
      $scope.usedCategories = $scope.getCategoryRows("USED",2);
      $scope.wholesaleCategories = $scope.getCategoryRows("WHOLESALE",2);
    }
  });

  $scope.getCategoryRows = function (key,size) {
    var newArr = [];
    if($scope.tabDetails[key].categories){
      for (var i=0; i<$scope.tabDetails[key].categories.length; i+=size) {
        newArr.push($scope.tabDetails[key].categories.slice(i, i+size));
      }
    }
    return newArr;
  };

  function getProductsByCategory (id) {
    var extended_url = '/category';
    var reqObj = {
      "path":id,
      "search":"",
      "sort":"",
      "order":"",
      "page":"1",
      "limit":"100000",
    }
    httpService.postRequest(serverConfig.clientAPI,extended_url,reqObj,{}).then(function(response){
      if(response.status === 200){

      }
    });
  }

  // $scope.tabs = [
  //   { index:0, heading: $filter('translate')('NEW'), route:"#/home/new",state:'home.new', tabPage:'new' ,active:true},
  //   { index:1, heading: $filter('translate')('OUTLETS'), route:"#/home/outlets",state:'home.outlets', tabPage:'outlets',active:false},
  //   { index:2, heading: $filter('translate')('WHOLESALE'), route:"#/home/wholesale",state:'home.wholesale', tabPage:'wholesale',active:false}
  // ];

  $scope.openCategoryPage = function (category){
    localStorage.setItem('SELECTED_CATEGORY',JSON.stringify(category));
    $state.go('categories');
  };

  $scope.goToState = function(tab){
     $state.go(tab.state);
  };

  $scope.$on("$stateChangeSuccess", function(event,toState, toParams, fromState, fromParams) {
   // console.log(fromState,toState)
    switch(toState.name){
      case 'home.new':
        setActive('new');
        break;
      case 'home.outlets':
        setActive('outlets');
        break;
      case 'home.wholesale':
        setActive('wholesale');
        break;
    }
  });

  function setActive(activeTab) {
    for(var i in $scope.tabs){
      if($scope.tabs[i].tabPage === activeTab){
        $scope.tabs[i].active = true;
        $scope.activeTabName = activeTab+'-tab';
        //console.log($scope.activeTabName);
      }else{
        $scope.tabs[i].active = false;
        // $scope.activeTabName = '';
      }
    }
  }

  $scope.openCategories = function (){
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('wish-list');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authHome');
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

  $scope.toggleSideBarHome = buildToggler('right');

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
