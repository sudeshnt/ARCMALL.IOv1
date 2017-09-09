'use strict';

var shopModule = angular.module('shop.module',[]);

shopModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'app/modules/shop/templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('home.new', {
      url: "/new",
      views: {
        'new-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/new.html",
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('home.used', {
      url: "/used",
      views: {
        'used-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/used.html",
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('home.wholesale', {
      url: "/wholesale",
      views: {
        'wholesale-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/wholesale.html",
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'app/modules/shop/templates/categories.html',
      controller: 'CategoryCtrl'
    })
    .state('wish-list', {
      url: '/wish-list',
      templateUrl: 'app/modules/shop/templates/wish-list.html',
      controller: 'WishListCtrl'
    })
    .state('item-list', {
      url: '/item-list',
      templateUrl: 'app/modules/shop/templates/item-list.html',
      controller: 'ItemListCtrl',
      params:{category_id:null}
    })
    .state('item', {
      url: '/item',
      templateUrl: 'app/modules/shop/templates/item.html',
      controller: 'ItemCtrl',
      params:{product:null}
    })
});
