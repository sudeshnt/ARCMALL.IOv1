'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope','$stateParams',
'httpService','serverConfig','$ionicSlideBoxDelegate','$window',
'$ionicGesture','$timeout','$mdSidenav','$log', 'publicFunc', '$translate', '$httpParamSerializer'];

function CategoryCtrl($scope,$state,$rootScope,$stateParams,httpService,
  serverConfig,$ionicSlideBoxDelegate,$window, $ionicGesture,
  $timeout,$mdSidenav,$log, publicFunc, $translate, $httpParamSerializer) {

  var type = $stateParams.type;

  var isCartLoaded = false;
  var isItemsToLoveLoaded = false;
  var isViewsLoaded = false;
  var brandsLoaded = false;

  $scope.toggleSideBarHome = buildToggler('right');

  // refresh time in minutes
  var refresh_after = 30;

  function init() {

    setLanguage(localStorage, function(success){
      $scope.SyncIsCompleted = false;
      $rootScope.showLoading();
      var localCategories = localStorage.getItem('cat_tabs');
      if(localCategories!=null && localCategories!=undefined && localCategories!=""){
        var tempTabs = JSON.parse(localCategories);
        if(tempTabs!=null && tempTabs!=undefined && tempTabs!=""){
          if(tempTabs.categories.length>0 && Date.parse(new Date)-tempTabs.last_saved_at < refresh_after*60*1000){
            initTabs(tempTabs.categories)
          }else {
            getAllCategories();
          }
        }else{
          getAllCategories();
        }
      }else{
        getAllCategories();
      }

      initCartItemCount();
      getLatestItems();
      getFeaturedItems();
      getBrands();
    });
  }

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };

  function initCartItemCount() {
    var extended_url = '/cart/products';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      disableLoading:true
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, reqObj,config).then(function(response){

      if(response.status === 200){
        for(var i in response.data.totals){
          if(response.data.totals[i].title == "Total"){
            response.data.total = response.data.totals[i].text
          }
        }
        $rootScope.cart = response.data;
        $rootScope.cartItemCount = response.data.products.length;
        localStorage.setItem('cartItemCount',$rootScope.cartItemCount);
        isCartLoaded = true;
        hideLoading();
      }
    });
  }

  function hideLoading() {
    if(isCartLoaded == true && isViewsLoaded == true && brandsLoaded == true) {

      $scope.SyncIsCompleted = true;
      $rootScope.hideLoading();
    }
  }

  // var cartStatus = localStorage.getItem('cartItemCount');
  //
  // if(cartStatus > 0) {
  //   $scope.cartItemCount = cartStatus;
  // }

  $scope.disableSwipe = function() {
   $ionicSlideBoxDelegate.enableSlide(false);
  };

  function getAllCategories() {
    var extended_url = '/category/all';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){

        var home = $translate('HOME');
        var wholesale = $translate('WHOLESALE');

        home.then(function(homeVal) {
          
          wholesale.then(function(wholesaleVal){

            console.log(homeVal);
            console.log(wholesaleVal);
            
            var home = {
              "category_id":"1",
              "name":homeVal,
              "image":"",
              "categories":[],
              "isHome":true
            }
    
            var wholesale = {
              "category_id":"2",
              "name":wholesaleVal,
              "image":"",
              "categories":[],
              "isHome":true
            }
    
            response.data.categories[0].categories.unshift(wholesale);
            response.data.categories[0].categories.unshift(home);
    
            initTabs(response.data.categories);

          });

        });

        
        

      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  function setLanguage(localStorage, callback) {
    var lang = window.navigator.userLanguage || window.navigator.language;

    if(lang && lang != "") {
      lang = lang.substring(0,2);
    }
    else {
      lang = "en";
    }

    var localLang = localStorage.getItem('language');

    if(localLang != lang) {

      localStorage.removeItem('cat_tabs');
      localStorage.setItem('language',lang);

      initLanguage(lang).then(function(response){
        
        callback(true);
        
      })
    }
    else {
      callback(true);
    }
  }

  function initLanguage(lang) {
    var extended_url = '/language/set';
    var reqObj = {
      'code':lang
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config);
  }

  function getLatestItems() {
    var extended_url = '/latest';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var newArrivals = response.data.products;
        $scope.newArrivals = publicFunc.devideArray(newArrivals,1);

        isItemsToLoveLoaded = true;
        hideLoading();

      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  function getFeaturedItems() {
    var extended_url = '/featured';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var itemsToLove = response.data.products;
        $scope.itemsToLove = publicFunc.devideArray(itemsToLove,1);

        isItemsToLoveLoaded = true;
        hideLoading();

      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  function getBrands() {
    var extended_url = '/product/getbrands';
    httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var brands = [];
        
        for(var index = 0; index<Object.keys(response.data).length; index++) {
          var brand = response.data[Object.keys(response.data)[index]];
          brand.image = serverConfig.clientAPI.serviceUrl +'/image/'+brand.image;
          console.log(brand.image)
          brands.push(brand);
        }

        $scope.brands = publicFunc.devideArray(brands,3);
        brandsLoaded = true;
        hideLoading();

      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  function initTabs(categories){
    $scope.cat_tabs = {};
    $scope.mainCategoryDropDown = [
      {
        "id":categories[0].category_id,
        "name":categories[0].name,
        "value":"NEW"
      },{
        "id":categories[1].category_id,
        "name":categories[1].name,
        "value":"USED"
      },{
        "id":categories[2].category_id,
        "name":categories[2].name,
        "value":"WHOLESALE"
      }
    ];

    //Injecting wholesale items to new items
    // categories[0].categories[1].categories = categories[2].categories;
    // categories[0].categories[1].id = categories[2].category_id;
    // categories[0].categories[1].name = categories[2].name;


    localStorage.setItem('cat_tabs',JSON.stringify({
      "categories" : categories,
      "last_saved_at" : Date.parse(new Date())
    }));

    setSelectedMainCategory();
    // get processed categories
    $scope.cat_tabs["NEW"] = $scope.getSubCategories(categories[0],2) ;
    $scope.cat_tabs["USED"] = $scope.getSubCategories(categories[1],2);
    $scope.cat_tabs["WHOLESALE"] = $scope.getSubCategories(categories[2],2)


    // $scope.selectedCatTabs = $scope.cat_tabs[type].concat($scope.cat_tabs["WHOLESALE"]);

    // $scope.cat_tabs[type].tabs = $scope.cat_tabs[type].tabs.concat($scope.cat_tabs["WHOLESALE"].tabs);
    // $scope.cat_tabs[type].content = $scope.cat_tabs[type].content.concat($scope.cat_tabs["WHOLESALE"].content);

    $scope.selectedCatTabs = $scope.cat_tabs[type];

    $ionicSlideBoxDelegate.update();

    

    var stores = [
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Adidas",
         "thumb":"img/store1.jpg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Adidas",
         "thumb":"img/store2.jpg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Adidas",
         "thumb":"img/store3.jpg",

      },
      // {
      //    "heading_title":"Blue &amp; grey school bag",
      //    "product_id":200,
      //    "name":"Adidas",
      //    "thumb":"img/banner_1020x400.png",
      //
      // },
      // {
      //    "heading_title":"Blue &amp; grey school bag",
      //    "product_id":200,
      //    "name":"Adidas",
      //    "thumb":"img/banner_1020x400.png",
      //
      // },
      // {
      //    "heading_title":"Blue &amp; grey school bag",
      //    "product_id":200,
      //    "name":"Adidas",
      //    "thumb":"img/banner_1020x400.png",
      //
      // },
      // {
      //    "heading_title":"Blue &amp; grey school bag",
      //    "product_id":200,
      //    "name":"Adidas",
      //    "thumb":"img/banner_1020x400.png",
      //
      // },
      // {
      //    "heading_title":"Blue &amp; grey school bag",
      //    "product_id":200,
      //    "name":"Adidas",
      //    "thumb":"img/banner_1020x400.png",
      //
      // },
    ]
    $scope.stores = publicFunc.devideArray(stores,1);

    isViewsLoaded = true;
    hideLoading();
  }

  function setSelectedMainCategory () {
    for(var i in $scope.mainCategoryDropDown){
      if($scope.mainCategoryDropDown[i].value == type){
        $scope.selectedMainCat = $scope.mainCategoryDropDown[i].value;
        break;
      }
    }
  }

  $scope.selectedMainCatChange = function(value){
    $state.go($state.current, {type:value}, {reload: true});
  };

  $scope.getSubCategories = function (arr,size) {
    var newNameArr = [];
    var newArr = [];
    var tempArr = []
    if(arr.categories){
      for(var i=0; i<arr.categories.length; i++){
        tempArr = [];
        if(arr.categories[i].categories.length>0){
          tempArr.push([arr.categories[i].categories[0]]);
          for (var j=1; j<arr.categories[i].categories.length; j+=size) {
            tempArr.push(arr.categories[i].categories.slice(j, j+size));
          }
        }
        newNameArr.push(
          {
            "name" : arr.categories[i].name,
            "id" : arr.categories[i].category_id,
            "sub_cats" : tempArr
          }
        );
        newArr.push(tempArr);
      }
    }
    return {
      "tabs" : newNameArr,
      "content" : newArr
    }
  };

  $scope.tabs = [
    {"text" : "ALL"},
    {"text" : "MEN"},
    {"text" : "WOMEN"},
    {"text" : "KIDS"},
    {"text" : "ACCESSORIES"},
    {"text" : "SUITS"}
  ];
  $scope.goHome = function () {
    $state.go('home.new');
  };
  $scope.goToItems = function (category) {
    $state.go('item-list',{category_id:category.category_id, manufacturer_id: null});
  };
  $scope.goToSearch = function () {
    $state.go('item-search');
  }
  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:null,product_id:product_id});
  };
  $scope.openBrandDetails = function(manufacturer_id){
    $state.go('item-list',{category_id:null, manufacturer_id:manufacturer_id});
  };
  $scope.openCategories = function (){
    $scope.close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
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
  $scope.openMyProducts = function () {
    $state.go('sellerProducts');
  };
  $scope.openMyProfile = function () {
    $scope.close();
    $state.go('my-profile');
  };
  $scope.logOut = function () {
    $rootScope.logOut();
  };

  init();



  //new slider

  $scope.ready = [];


  $scope.$on("$ionicView.afterEnter", function (event, data) {

    //initialisation of ready array to false
    angular.forEach($scope.catgs, function (value, key)
    {
      //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
      if(key===0)
      {
        $scope.ready.push(0 + ': ' + true);
      }
      //To stop loading other slides (pages) make sure to give 'false' to ther corresponding key in ready array
      $scope.ready.push(key + ': ' + false);
    });
  });


  $scope.changeSlide = function (index)
  {
    //when slide is active : let angular to load it's content
    $scope.ready.push(index + ': ' + true);
  };

}
