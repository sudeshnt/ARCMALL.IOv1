'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$filter','$rootScope','appConfig','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast','UserService','$ionicActionSheet','$ionicLoading','serverConfig','httpService','$httpParamSerializer','publicFunc'];

function HomeCtrl($scope,$state,$filter,$rootScope,appConfig,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast,UserService,$ionicActionSheet,$ionicLoading,serverConfig,httpService,$httpParamSerializer,publicFunc) {

  $scope.activeTabName = null;

  $scope.tabDetails = {
    "NEW":{"name":"NEW"},
    "USED":{"name":"USED"},
    "WHOLESALE":{"name":"WHOLESALE"}
  };

  init();

  function init() {
     // initBanners();
     initLatestProducts();
     initFeaturedProducts();
  }

  function getProductsByCategory (id) {
    var extended_url = '/category';
    var reqObj = {
      "path":id
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.products = publicFunc.devideArray(response.data.products,2);
        console.log($scope.products);
      }
    });
  }

  function initBanners(){
    var extended_url = '/design/banners';
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, {},config).then(function(response){
      if(response.status === 200){
       console.log(response);
      }
    });
  }

  function initLatestProducts(){
    var extended_url = '/latest';
    var reqObj = {
      "start":0,
      "limit":4,
      "width":200,
      "height":200,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.latestProducts = publicFunc.devideArray(response.data.products,2);
      }
    });
  }

  function initFeaturedProducts(){
    var extended_url = '/latest';
    // var extended_url = '/featured';
    var reqObj = {
      "start":5,
      "limit":4,
      "width":200,
      "height":200,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        $scope.featuredProducts = publicFunc.devideArray(response.data.products,2);
      }
    });
  }

  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:-1,product_id:product_id});
  };

  // var extended_url = '/category/all';
  // httpService.postRequest(serverConfig.clientAPI,extended_url,{},{}).then(function(response){
  //   if(response.status === 200){
  //     var tabName = '';
  //     for(var i in response.data.categories){
  //       tabName = response.data.categories[i].name.split(" ")[0].toUpperCase();
  //       $scope.tabDetails[tabName] = response.data.categories[i];
  //     }
  //     $scope.newCategories = $scope.getCategoryRows("NEW",2);
  //     $scope.usedCategories = $scope.getCategoryRows("USED",2);
  //     $scope.wholesaleCategories = $scope.getCategoryRows("WHOLESALE",2);
  //   }
  // });

  $scope.getCategoryRows = function (key,size) {
    var newArr = [];
    if($scope.tabDetails[key].categories){
      for (var i=0; i<$scope.tabDetails[key].categories.length; i+=size) {
        newArr.push($scope.tabDetails[key].categories.slice(i, i+size));
      }
    }
    return newArr;
  };

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
      case 'home.used':
        setActive('outlets');
        getProductsByCategory (76)
        break;
      case 'home.wholesale':
        setActive('wholesale');
        getProductsByCategory (77)
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
  $scope.openOrderHistory = function () {
    $scope.close();
    $state.go('order-history');
  };
  $scope.openAddItem = function () {
    $state.go('sellerHome');
  };
  $scope.openMyProfile = function () {
    $scope.close();
    $state.go('my-profile');
  };
  $scope.logOut = function () {
    $scope.close();
    localStorage.setItem('loginStatus',false);
    localStorage.setItem('authResponse',null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    $state.go('authSignIn');
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
