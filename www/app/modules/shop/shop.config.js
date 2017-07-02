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
    .state('home.whatsNew', {
      url: "/whats-new",
      views: {
        'whats-new-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/whats-new.html",
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('home.justForYou', {
      url: "/just-for-you",
      views: {
        'just-for-you-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/just-for-you.html",
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('home.mostTrending', {
      url: "/most-trending",
      views: {
        'most-trending-tab': {
          templateUrl: "app/modules/shop/templates/home-tabs/most-trending.html",
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
