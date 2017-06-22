'use strict';

var shopModule = angular.module('shop.module',[]);

shopModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/modules/shop/templates/home.html',
      controller: 'HomeCtrl'
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
    .state('item', {
      url: '/item',
      templateUrl: 'app/modules/shop/templates/item.html',
      controller: 'ItemCtrl'
    })
});
