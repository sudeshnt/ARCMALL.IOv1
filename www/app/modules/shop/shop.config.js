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
    .state('home.outlets', {
      url: "/outlets",
      views: {
        'outlets-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/outlets.html",
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
      controller: 'ItemListCtrl'
    })
    .state('item', {
      url: '/item',
      templateUrl: 'app/modules/shop/templates/item.html',
      controller: 'ItemCtrl'
    })
});
