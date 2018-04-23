'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope','$stateParams',
'httpService','serverConfig','$ionicSlideBoxDelegate','$window',
'$ionicGesture','$timeout','$mdSidenav','$log', 'publicFunc', '$translate'];

function CategoryCtrl($scope,$state,$rootScope,$stateParams,httpService,
  serverConfig,$ionicSlideBoxDelegate,$window, $ionicGesture,
  $timeout,$mdSidenav,$log, publicFunc, $translate) {

  var type = $stateParams.type;

  var isCartLoaded = false;
  var isItemsToLoveLoaded = false;
  var isViewsLoaded = false;

  $scope.toggleSideBarHome = buildToggler('right');

  // refresh time in minutes
  var refresh_after = 30;

  function init() {
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

    getFeaturedItems();
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
    if(isCartLoaded == true && isViewsLoaded == true) {

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

  function getFeaturedItems() {
    var extended_url = '/featured';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        var itemsToLove = response.data.products;
        $scope.itemsToLove = publicFunc.devideArray(itemsToLove,1);
        $scope.newArrivals = publicFunc.devideArray(itemsToLove,1);

        isItemsToLoveLoaded = true;
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

    // var newArrivals = [
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //
    // ];
    // $scope.newArrivals = publicFunc.devideArray(newArrivals,1);

    var brands = [
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Nike",
         "thumb":"http://www.pittwatergolfcentre.com.au/wp-content/uploads/2014/11/nike-logo-square.png",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Huawei",
         "thumb":"https://png.pngtree.com/element_origin_min_pic/16/11/23/403b5a759e2ab455b9ee5cfa107a3077.jpg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Prada",
         "thumb":"http://assets.macerichepicenter.com/FileManager/_shared/Retailers/Logos/app/Prada.png",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Apple",
         "thumb":"https://image.freepik.com/free-icon/apple-logo_318-40184.jpg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Under Armour",
         "thumb":"https://www.mallmaverick.com/system/stores/store_fronts/000/022/676/original/under.png?1452747481",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Reebok",
         "thumb":"https://www.worldfootwear.com/media/images/news/wf2017182638p.jpeg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Targus",
         "thumb":"https://m.media-amazon.com/images/S/aplus-media/vc/43564ba0-1512-4c0d-94f5-1e95b5dad4d0._SR300,300_.jpg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Swiss Gear",
         "thumb":"https://target.scene7.com/is/image/Target/swissGear102149-171008_1507428391418?wid=328&hei=328&qlt=80&fmt=pjpeg",

      },
      {
         "heading_title":"Blue &amp; grey school bag",
         "product_id":200,
         "name":"Xiomi",
         "thumb":"https://www.shareicon.net/data/512x512/2015/09/01/94003_xiaomi_512x512.png",

      },
    ]
    $scope.brands = publicFunc.devideArray(brands,3);

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

    // var itemsToLove = [
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "name":"bag",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "name":"bag",
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "name":"bag",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "name":"bag",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "name":"bag",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "reward":0,
    //      "name":"bag",
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //   {
    //      "heading_title":"Blue &amp; grey school bag",
    //      "product_id":200,
    //      "manufacturer":null,
    //      "manufacturers":null,
    //      "model":"adidas",
    //      "name":"bag",
    //      "reward":0,
    //      "points":"0",
    //      "description":"Brand new\r\n",
    //      "stock":"In Stock",
    //      "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/wkseller\/sahan16\/Bags\/laptop-bags-500x500-500x539.jpg",
    //      "images":[
    //         {
    //            "popup":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg",
    //            "thumb":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-92x99.jpg",
    //            "preview":"http:\/\/arcmall.alofatechlabs.com\/image\/cache\/catalog\/16142974_1216435861810441_2855475497624286406_n-500x539-500x539.jpg"
    //         }
    //      ],
    //      "price":"$234.00",
    //      "price_clear":234,
    //      "currency_format":"${value}",
    //      "decimal_place":2,
    //      "special":"$134.00",
    //      "special_clear":134,
    //      "mobile_special":false,
    //      "tax":"$134.00",
    //      "discounts":[
    //
    //      ],
    //      "options":[
    //
    //      ],
    //      "minimum":"1",
    //      "review_status":"1",
    //      "review_guest":true,
    //      "customer_name":"",
    //      "reviews":"0 reviews",
    //      "rating":0,
    //      "entry_name":"Your Name",
    //      "entry_review":"Your Review",
    //      "captcha":"",
    //      "attribute_groups":[
    //
    //      ],
    //      "products":[
    //
    //      ],
    //      "tags":[
    //
    //      ],
    //      "recurrings":[
    //
    //      ]
    //   },
    //
    // ];
    // $scope.itemsToLove = publicFunc.devideArray(itemsToLove,1);

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
    $state.go('item-list',{category_id:category.category_id});
  };
  $scope.goToSearch = function () {
    $state.go('item-search');
  }
  $scope.openItemDetails = function(product_id){
    $state.go('item',{category_id:null,product_id:product_id});
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
