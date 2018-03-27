'use strict';

angular.module('shop.module').controller('ItemCtrl',ItemCtrl );

ItemCtrl.$inject = ['$scope','$state','$rootScope','$filter','$stateParams',
'serverConfig','httpService','$httpParamSerializer','cartSev','$mdBottomSheet',
'$timeout','publicFunc', '$ionicModal', '$ionicSlideBoxDelegate'];

function ItemCtrl($scope,$state,$rootScope,$filter,$stateParams,serverConfig,
  httpService,$httpParamSerializer,cartSev,$mdBottomSheet,
  $timeout,publicFunc, $ionicModal, $ionicSlideBoxDelegate) {

    $scope.cartSev = cartSev;

    if($stateParams.product_id){
      $scope.category_id = $stateParams.category_id;
      $scope.product_id = $stateParams.product_id;
      init();
    }else{
      // $scope.product_id = 174;
      // init();
      $state.go('categories');
    }


    $ionicModal.fromTemplateUrl('app/modules/shop/templates/shipping-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.addItemToCart = function () {
      if(!cartSev.shoppingCart.cart.itemList){
        cartSev.shoppingCart.initCartValue();
      }
      // cartSev.shoppingCart.addItem($scope.product);
      addProductToCartAPI();
    };

    $scope.updateQuantity = function (product,type) {
      if(type=='minus'){
        product.quantity = product.quantity > 1 ? product.quantity -= 1 : product.quantity;
      }else if(type=='plus'){
        product.quantity += 1;
      }
    }

    $scope.setSelectedOption = function (option,selectedOption) {
      console.log(option,JSON.parse(selectedOption));
      $scope.product.selected_options.push({
        // "option_id": option.option_id,
        "option_id": option.product_option_id,
        // "option_value_id": JSON.parse(selectedOption).option_value_id
        "option_value_id": JSON.parse(selectedOption).product_option_value_id
      });
    }

    function addProductToCartAPI() {
        var itemAvailability = false;
        for(var i in $rootScope.cart.products){
          if($rootScope.cart.products[i].product_id == $scope.product.product_id){
            itemAvailability = true;
            break;
          }
        }

        var extended_url = '/cart/add';
        var reqObj = {
          "product_id":$scope.product.product_id,
          "quantity":$scope.product.quantity,
          "option":[]
          // "option":[]
        };
        if($scope.product.selected_options.length>0){
          for(var i in $scope.product.selected_options){
            reqObj.option[$scope.product.selected_options[i].option_id] = parseInt($scope.product.selected_options[i].option_value_id)
            // reqObj.option = [$scope.product.selected_options[i].option_value_id]
            // reqObj.option.push($scope.product.selected_options[i].option_value_id)
            // reqObj[$scope$scope.product.selected_options[i].option_id] = $scope.product.selected_options[i].option_value_id;
          }
        }
        // console.log(reqObj);
        var config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){

          // if(response != null) {
            // if(response.status === 200){
              $rootScope.cartItemCount = !itemAvailability ? $rootScope.cartItemCount+=1 : $rootScope.cartItemCount;
              localStorage.setItem('cartItemCount',$rootScope.cartItemCount);

            // }
          // }

        });
    }


    $scope.getShippingMethods = function () {
        // var itemAvailability = false;
        // for(var i in $rootScope.cart.products){
        //   if($rootScope.cart.products[i].product_id == $scope.product.product_id){
        //     itemAvailability = true;
        //     break;
        //   }
        // }

        console.log("shipping");

        var extended_url = '/shipping/methods';
        var reqObj = {
          "product_id":$scope.product.product_id,
          "quantity":$scope.product.quantity,
          "option":{}
          // "option":[]
        };
        // if($scope.product.selected_options.length>0){
          // for(var i in $scope.product.selected_options){
          //   reqObj.option[$scope.product.selected_options[i].option_id] = parseInt($scope.product.selected_options[i].option_value_id)
          //   // reqObj.option = [$scope.product.selected_options[i].option_value_id]
          //   // reqObj.option.push($scope.product.selected_options[i].option_value_id)
          //   // reqObj[$scope$scope.product.selected_options[i].option_id] = $scope.product.selected_options[i].option_value_id;
          // }
        // }
        // console.log(reqObj);
        var config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          disableLoading:true
        };

        httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){

          var shippingMethods = [];
          if(response.status === 200){
            // $scope.shippingMethods = response.data;

            var shipping = response.data.shipping_methods;

            for (var key in shipping) {
              var ship = shipping[key];
              ship.info = ship.quote[key];
              shippingMethods.push(shipping[key]);
            }

            $scope.shippingMethods = shippingMethods;

            console.log(shippingMethods);
            $scope.openModal();
          }

        });
    }


    $scope.goToItems = function () {
      if(!$scope.category_id || $scope.category_id==-1){
        $state.go('categories');
      }else{
        $state.go('item-list',{category_id:$scope.category_id});
      }
    };

    $scope.goToReviewsModal = function () {
      $state.go('basic-modal', {obj: $scope.reviews, type: 'reviews',
      state:$scope, categoty_id:$scope.category_id,
      product_id:$scope.product_id});
    };

    $scope.goToShippingModal = function () {
      $state.go('basic-modal', {obj: $scope.shippingMethods, type: 'shipping',
      state:$scope, categoty_id:$scope.category_id,
      product_id:$scope.product_id});
    };

    $scope.openCartPage = function () {
      $state.go('cart');
    }

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

  var bottomSheet;

  $scope.toggleBottomSheet = function() {
    $scope.alert = 'asdsa';
    $mdBottomSheet.show({
      templateUrl:'app/modules/shop/templates/itemOptions.html',
      controller:'itemOptionsCtrl',
      scope: $scope
    }).then(function(clickedItem) {

    }).catch(function(error) {

    });
  };

  $scope.addItemToWishList = function (){
      var wishList = JSON.parse(localStorage.getItem('wish_list'));
      var availability = false;
      if(!wishList){
        wishList = [];
      }else{
        if(wishList.length>0){
          for(var i in wishList){
            if(wishList[i].product_id == $scope.product.product_id){
              availability = true;
              break;
            }
          }
        }
      }
      if(!$scope.availability_in_wishlist){
        wishList.push($scope.product);
        localStorage.setItem('wish_list',JSON.stringify(wishList));
        $scope.availability_in_wishlist = true;
      }
  };

  function initAvailabilityInWIshList() {
    var wishList = JSON.parse(localStorage.getItem('wish_list'));
    var availability = false;
    if(wishList){
      if(wishList.length>0){
        for(var i in wishList){
          if(wishList[i].product_id == $scope.product.product_id){
            availability = true;
            break;
          }
        }
      }
    }
    return availability;
  }

  $scope.isGroupShown = function(group) {
      return group.show;
    };

    function hideAllGroups() {
      for(var i in $scope.groups){
        $scope.groups[i].show = false;
      }
    }

    function initProduct() {
      var extended_url = '/product';
      var reqObj = {
        "product_id":$scope.product_id
      };
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          $scope.product = response.data;
          $scope.product.quantity = 1;
          $scope.product.selected_options = [];
          $scope.percentage = (response.data.special_clear / response.data.price_clear * 100).toFixed(1);


          $scope.ratingsObject = {
            iconOn: 'ion-ios-star',    //Optional
            iconOff: 'ion-ios-star-outline',   //Optional
            iconOnColor: '#f3d97e',  //Optional
            iconOffColor:  'rgb(200, 100, 100)',    //Optional
            rating:  response.data.rating, //Optional
            minRating:0,    //Optional
            readOnly: true, //Optional
            callback: function(rating, index) {    //Mandatory
              $scope.ratingsCallback(rating, index);
            }
          };


          // remove this when actual seller is taken from product
          $scope.product.seller_id = 1;

          $scope.availability_in_wishlist = initAvailabilityInWIshList();

          $scope.groups = [
            {
              name: $filter('translate')('DESCRIPTION'),
              show: false,
              content: $scope.product.description
            },{
              name: $filter('translate')('REVIEWS'),
              show: false,
              content: $scope.product.reviews
            },
            {
              name: $filter('translate')('SHIPPING_INFORMATION'),
              show: false,
              content: ''
            },
            {
              name: $filter('translate')('RETURN_POLICY'),
              show: false,
              content: "Returns accepted if the product is not as described or is damaged"
            },
            {
              name: $filter('translate')('BUYER_PROTECTION'),
              show: false,
              content: "To ensure that every buyer is protected when purchasing from Arcmall, we have the following refund options: \n" +
              "- Full refund if you don't receive your item\n" +
              "- Full or partial refund if the item is not as described or is damaged"
            }
          ];
          getProductReview();
          initRelatedProducts();
          $ionicSlideBoxDelegate.update()
        }
      });
    }

    function getProductReview() {
      var extended_url = '/product/getreviews';
      var reqObj = {
        "product_id":$scope.product_id
      };
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){

          // var rating = [];

            if(response.data.reviews.length > 0) {
              console.log("yes rating");
              for(var index in response.data.reviews) {

                var review = response.data.reviews[index];
                var ratingsObject = {
                  iconOn: 'ion-ios-star',    //Optional
                  iconOff: 'ion-ios-star-outline',   //Optional
                  iconOnColor: '#f3d97e',  //Optional
                  iconOffColor:  'rgb(200, 100, 100)',    //Optional
                  rating:  review.rating, //Optional
                  minRating:0,    //Optional
                  readOnly: true, //Optional
                  callback: function(rating, index) {    //Mandatory
                    $scope.ratingsCallback(rating, index);
                  }
                };

                console.log("review");
                console.log(review);

                response.data.reviews[index].rating = Object.assign({}, ratingsObject);

                // response.data.ratings.push(Object.assign({}, ratingsObject));
              }
            }
            else {

              response.data.reviews = [];
              response.data.reviews[0] = {};

              var ratingsObject = {
                iconOn: 'ion-ios-star',    //Optional
                iconOff: 'ion-ios-star-outline',   //Optional
                iconOnColor: '#f3d97e',  //Optional
                iconOffColor:  'rgb(200, 100, 100)',    //Optional
                rating: 0, //Optional
                minRating:0,    //Optional
                readOnly: true, //Optional
                callback: function(rating, index) {    //Mandatory
                  $scope.ratingsCallback(rating, index);
                }
              };

              response.data.reviews[0]["rating"] = Object.assign({}, ratingsObject);
            }


            $scope.reviews = response.data;

            console.log("reviews");
            console.log($scope.reviews);
        }
      });
    }

    function initRelatedProducts(){
      var extended_url = '/latest';
      var reqObj = {
        "start":50,
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
          $scope.relatedProducts = publicFunc.devideArray(response.data.products,2);
        }
      });
    }

    $scope.openItemDetails = function(product_id){
      $state.go('item',{category_id:$scope.category_id,product_id:product_id});
    };

    function init(){
      initProduct();
      // getShippingMethods();
    }
}
