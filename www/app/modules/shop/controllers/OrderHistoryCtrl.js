'use strict';

angular.module('shop.module').controller('OrderHistoryCtrl',OrderHistoryCtrl );

OrderHistoryCtrl.$inject = ['$scope','$state','$rootScope','$mdSidenav','$log'];

function OrderHistoryCtrl($scope,$state,$rootScope,$mdSidenav,$log) {

  $scope.orders = [
    {
      "name": "shoppingCart",
      "orderValue" : '$ 1000',
      "cart": {
        "itemList": [{
          "heading_title": "trtsfd",
          "product_id": 213,
          "manufacturer": null,
          "manufacturers": null,
          "model": "sample",
          "reward": 0,
          "points": "0",
          "description": "cdghscvghsdvchgcvdhg\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/Jagath15/gift-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/Jagath15/gift-500x539.jpg",
          "images": [],
          "price": "$100.00",
          "price_clear": 100,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$100.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 6,
          "$$hashKey": "object:564"
        }, {
          "heading_title": "Toy car",
          "product_id": 210,
          "manufacturer": null,
          "manufacturers": null,
          "model": "Toys",
          "reward": 0,
          "points": "0",
          "description": "Brand new\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/kids-toy-500x500-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/kids-toy-500x500-500x539.jpg",
          "images": [],
          "price": "$562.00",
          "price_clear": 562,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$562.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 6,
          "$$hashKey": "object:3458"
        }, {
          "heading_title": "Soccer ball",
          "product_id": 208,
          "manufacturer": null,
          "manufacturers": null,
          "model": "Soccer",
          "reward": 0,
          "points": "0",
          "description": "Brand new\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/pele-dimple-rubber-soccer-ball-5-576-500x500-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/pele-dimple-rubber-soccer-ball-5-576-500x500-500x539.jpg",
          "images": [],
          "price": "$45.00",
          "price_clear": 45,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$45.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 7,
          "$$hashKey": "object:3502"
        }, {
          "heading_title": "hellwetica",
          "product_id": 214,
          "manufacturer": null,
          "manufacturers": null,
          "model": "dsaaddsa",
          "reward": 0,
          "points": "0",
          "description": "sample\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/Jagath15/sports-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/Jagath15/sports-500x539.jpg",
          "images": [],
          "price": "$200.00",
          "price_clear": 200,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$200.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 4
        }, {
          "heading_title": "Soft toy",
          "product_id": 211,
          "manufacturer": null,
          "manufacturers": null,
          "model": "Toys",
          "reward": 0,
          "points": "0",
          "description": "Brand new\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/bear-36-brown-500x500-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/bear-36-brown-500x500-500x539.jpg",
          "images": [],
          "price": "$25.00",
          "price_clear": 25,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$25.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 2
        }, {
          "heading_title": "Red teddy bear",
          "product_id": 209,
          "manufacturer": null,
          "manufacturers": null,
          "model": "Teddy",
          "reward": 0,
          "points": "0",
          "description": "Brand new\n",
          "stock": "In Stock",
          "popup": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/stuffed-toys-500x500-500x539.jpg",
          "thumb": "http://arcmall.alofatechlabs.com/image/cache/wkseller/sahan16/Used/stuffed-toys-500x500-500x539.jpg",
          "images": [],
          "price": "$45.00",
          "price_clear": 45,
          "currency_format": "${value}",
          "decimal_place": 2,
          "special": false,
          "special_clear": false,
          "mobile_special": false,
          "tax": "$45.00",
          "discounts": [],
          "options": [],
          "minimum": "1",
          "review_status": "1",
          "review_guest": true,
          "customer_name": "",
          "reviews": "0 reviews",
          "rating": 0,
          "entry_name": "Your Name",
          "entry_review": "Your Review",
          "captcha": "",
          "attribute_groups": [],
          "products": [],
          "tags": [],
          "recurrings": [],
          "quantity": 1
        }],
        "orderValue": 0
      },
      "isEmpty": false
    }
  ];

  $scope.viewOrderDetails = function(order){
    $state.go('view-order-history',{order:order});
  }

  $scope.goHome = function () {
    $state.go('home.new');
  };

  $scope.openItemDetails = function(){
    $state.go('item');
  };
  $scope.openCategories = function (){
    $scope.close();
    $state.go('categories');
  };
  $scope.openHome = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('home.new');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authHome');
  };

  $scope.toggleSideBar = buildToggler('left');

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
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };


}
