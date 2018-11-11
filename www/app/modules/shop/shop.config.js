"use strict";

var shopModule = angular.module("shop.module", []);

shopModule.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    // .state('home', {
    //   url: '/home',
    //   abstract: true,
    //   templateUrl: 'app/modules/shop/templates/home.html',
    //   controller: 'HomeCtrl'
    // })
    // .state('home.new', {
    //   url: "/new",
    //   views: {
    //     'new-tab': {
    //       templateUrl: "app/modules/shop/templates/home-tabs/new.html",
    //       // controller: 'HomeCtrl'
    //     }
    //   }
    // })
    // .state('home.used', {
    //   url: "/used",
    //   views: {
    //     'used-tab': {
    //       templateUrl: "app/modules/shop/templates/home-tabs/used.html",
    //       // controller: 'HomeCtrl'
    //     }
    //   }
    // })
    // .state('home.wholesale', {
    //   url: "/wholesale",
    //   views: {
    //     'wholesale-tab': {
    //       templateUrl: "app/modules/shop/templates/home-tabs/wholesale.html",
    //       // controller: 'HomeCtrl'
    //     }
    //   }
    // })
    .state("categories", {
      url: "/categories",
      templateUrl: "app/modules/shop/templates/categories.html",
      controller: "CategoryCtrl",
      params: { type: "NEW" }
    })
    .state("wish-list", {
      url: "/wish-list",
      templateUrl: "app/modules/shop/templates/wish-list.html",
      controller: "WishListCtrl"
    })
    .state("order-history", {
      url: "/order-history",
      templateUrl: "app/modules/shop/templates/order-history.html",
      controller: "OrderHistoryCtrl"
    })
    .state("view-order-history", {
      url: "/view-order-history",
      templateUrl: "app/modules/shop/templates/view-order-history.html",
      controller: "ViewOrderHistoryCtrl",
      params: { order: null }
    })
    .state("item-list", {
      url: "/item-list",
      templateUrl: "app/modules/shop/templates/item-list.html",
      controller: "ItemListCtrl",
      params: { category_id: null }
    })
    .state("item", {
      url: "/item",
      templateUrl: "app/modules/shop/templates/item.html",
      controller: "ItemCtrl",
      params: { category_id: null, product_id: null }
    })
    .state("item-search", {
      url: "/item-search",
      templateUrl: "app/modules/shop/templates/itemSearch.html",
      controller: "ItemSearchCtrl"
    })
    .state("my-profile", {
      url: "/my-profile",
      templateUrl: "app/modules/shop/templates/my-profile.html",
      controller: "MyProfileCtrl"
    })
    .state("seller-profile", {
      url: "/seller-profile/:product_id/:seller_id",
      templateUrl: "app/modules/shop/templates/seller-profile.html",
      controller: "SellerProfileCtrl"
    });
});
