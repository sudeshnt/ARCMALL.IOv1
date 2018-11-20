"use strict";

angular.module("dashboard.module").controller("DashBoardCtrl", DashBoardCtrl);

DashBoardCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "$stateParams",
  "httpService",
  "serverConfig",
  "sharedProperties",
  "$ionicSlideBoxDelegate",
  "$window",
  "$ionicGesture",
  "$timeout",
  "$mdSidenav",
  "$log",
  "$ionicScrollDelegate",
  "$httpParamSerializer"
];

function DashBoardCtrl(
  $scope,
  $state,
  $rootScope,
  $stateParams,
  httpService,
  serverConfig,
  sharedProperties,
  $ionicSlideBoxDelegate,
  $window,
  $ionicGesture,
  $timeout,
  $mdSidenav,
  $log,
  $ionicScrollDelegate,
  $httpParamSerializer
) {
  var type = "NEW";

  $scope.next1 = function() {
    $ionicScrollDelegate.$getByHandle("mysliderone").scrollBy(150, 0, true);
  };

  /**code for auto complete */
  $scope.model = "";
  $scope.clickedValueModel = "";
  $scope.removedValueModel = "";
  $scope.search_text = "";
  $scope.arry_item = ["item 1", "item 2", "item3"];
  $scope.allImages = [
    "app/modules/dashboard/img/1.png",
    "app/modules/dashboard/img/1.png",
    "app/modules/dashboard/img/1.png"
  ];
  console.log($scope.search_text);
  console.log("role-->" + $window.localStorage.getItem("role"));
  $scope.role = $window.localStorage.getItem("role");
  $scope.getTestItems = function(query) {
    if (query) {
      $scope.user = {
        search: query
      };

      var extended_url = "/product/search";
      var req = angular.copy($scope.user);
      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      httpService
        .postRequest(
          serverConfig.clientAPI,
          extended_url,
          $httpParamSerializer(req),
          config
        )
        .then(function(response) {
          if (response.status === 200) {
            var authResponse = response.data.products;

            console.log(authResponse);
            $state.go("dashboard");
            // $state.go('home.new');
          } else {
            $scope.error = response.error_warning;
          }
        });

      return authResponse;

      // items: [
      //   {
      //     id: "1",
      //     name: query + "1",
      //     view: "view: " + query + "1"
      //   },
      //   {
      //     id: "2",
      //     name: query + "2",
      //     view: "view: " + query + "2"
      //   },
      //   {
      //     id: "3",
      //     name: query + "3",
      //     view: "view: " + query + "3"
      //   }
      // ]
    }
    return {
      items: []
    };
  };

  $scope.goTo = function(category) {
    console.log(name);
    sharedProperties.setObject(category);

    $state.go("items");
  };

  $scope.openItemDetails = function(product_id) {
    $state.go("item", {
      product_id: product_id
    });
  };

  $scope.goToAllCategories = function() {
    $state.go("categoriesall");
  };

  $scope.itemsClicked = function(callback) {
    $scope.clickedValueModel = callback;
  };
  $scope.itemsRemoved = function(callback) {
    $scope.removedValueModel = callback;
  };

  $scope.previous1 = function() {
    $ionicScrollDelegate.$getByHandle("mysliderone").scrollBy(-150, 0, true);
  };
  $scope.next2 = function() {
    $ionicScrollDelegate.$getByHandle("myslidertwo").scrollBy(150, 0, true);
  };

  $scope.previous2 = function() {
    $ionicScrollDelegate.$getByHandle("myslidertwo").scrollBy(-150, 0, true);
  };

  $scope.sliderOptions = {
    effect: "slide",
    paginationHide: true,
    initialSlide: 0,
    onInit: function(swiper) {
      $scope.swiper = swiper;
    },
    onSlideChangeEnd: function(swiper) {
      // ....
    }
  };
  $scope.toggleSideBarHome = buildToggler("right");

  // refresh time in minutes
  var refresh_after = 30;

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }
  $scope.close = function() {
    $mdSidenav("right")
      .close()
      .then(function() {
        $log.debug("close RIGHT is done");
      });
  };

  function getAllCategories() {
    var extended_url = "/category/all";
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200 && !response.error_warning) {
          console.log(response.data);

          $scope.allCategories = response.data.categories[0].categories;
          console.log($scope.allCategories);

          initTabs(response.data.categories);
        } else {
          $scope.error = response.error_warning;
        }
      });
  }
  function getFeatured() {
    $scope.loginStatus = $window.localStorage.getItem("logged");
    console.log("loginstatus" + $window.localStorage.getItem("logged"));
    var extended_url = "/featured";
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200 && !response.error_warning) {
          console.log(response.data);

          $scope.featured = response.data.products;
          console.log($scope.featured);

          initTabs(response.data.categories);
        } else {
          $scope.error = response.error_warning;
        }
      });
  }
  function getBestSeller() {
    var extended_url = "/featured/bestseller";
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200 && !response.error_warning) {
          console.log(response.data);

          $scope.bestSeller = response.data.products;
          console.log($scope.bestSeller);

          initTabs(response.data.categories);
        } else {
          $scope.error = response.error_warning;
        }
      });
  }

  function initTabs(categories) {
    $scope.cat_tabs = {};
    $scope.mainCategoryDropDown = [
      {
        id: categories[0].category_id,
        name: categories[0].name,
        value: "NEW"
      },
      {
        id: categories[1].category_id,
        name: categories[1].name,
        value: "USED"
      },
      {
        id: categories[2].category_id,
        name: categories[2].name,
        value: "WHOLESALE"
      }
    ];

    setSelectedMainCategory();
    // get processed categories
    $scope.cat_tabs["NEW"] = $scope.getSubCategories(categories[0], 2);
    $scope.cat_tabs["USED"] = $scope.getSubCategories(categories[1], 2);
    $scope.cat_tabs["WHOLESALE"] = $scope.getSubCategories(categories[2], 2);

    $scope.selectedCatTabs = $scope.cat_tabs[type];
    $ionicSlideBoxDelegate.update();
  }

  function setSelectedMainCategory() {
    for (var i in $scope.mainCategoryDropDown) {
      if ($scope.mainCategoryDropDown[i].value == type) {
        $scope.selectedMainCat = $scope.mainCategoryDropDown[i].value;
        break;
      }
    }
  }

  $scope.selectedMainCatChange = function(value) {
    $state.go(
      $state.current,
      {
        type: value
      },
      {
        reload: true
      }
    );
  };

  $scope.getSubCategories = function(arr, size) {
    var newNameArr = [];
    var newArr = [];
    var tempArr = [];
    if (arr.categories) {
      for (var i = 0; i < arr.categories.length; i++) {
        tempArr = [];
        if (arr.categories[i].categories.length > 0) {
          tempArr.push([arr.categories[i].categories[0]]);
          for (var j = 1; j < arr.categories[i].categories.length; j += size) {
            tempArr.push(arr.categories[i].categories.slice(j, j + size));
          }
        }
        newNameArr.push({
          name: arr.categories[i].name,
          id: arr.categories[i].category_id,
          sub_cats: tempArr
        });
        newArr.push(tempArr);
      }
    }
    return {
      tabs: newNameArr,
      content: newArr
    };
  };

  $scope.tabs = [
    {
      text: "ALL"
    },
    {
      text: "MEN"
    },
    {
      text: "WOMEN"
    },
    {
      text: "KIDS"
    },
    {
      text: "ACCESSORIES"
    },
    {
      text: "SUITS"
    }
  ];
  $scope.categories = ["image2.png", "image3.png", "image4.png", "image5.png"];
  $scope.goHome = function() {
    $state.go("home.new");
  };
  $scope.goToItems = function(category) {
    $state.go("item-list", {
      category_id: category.category_id
    });
  };
  $scope.openAboutUs = function() {
    var opts = {
      toolbar: "no",
      location: "no",
      useWideViewPort: "no",
      enableViewportScale: "yes"
    };
    $window.open("http://arcmall.com/about_us", "_blank", opts);
  };
  $scope.openPrivacyPolicy = function() {
    var opts = {
      toolbar: "no",
      location: "no",
      useWideViewPort: "no",
      enableViewportScale: "yes"
    };
    $window.open("http://arcmall.com/privacy", "_blank", opts);
  };
  $scope.goToSearch = function() {
    $state.go("item-search");
  };
  $scope.openTermsAndCondition = function() {
    var opts = {
      toolbar: "no",
      location: "no",
      useWideViewPort: "no",
      enableViewportScale: "yes"
    };
    $window.open("http://arcmall.com/terms", "_blank", opts);
  };
  $scope.openCategories = function() {
    $scope.close();
    $state.go("categoriesall");
  };
  $scope.openWishList = function() {
    $scope.close();
    $state.go("wish-list");
  };
  $scope.openSignIn = function() {
    $scope.close();
    $state.go("signin");
  };
  $scope.openOrderHistory = function() {
    $scope.close();
    $state.go("order-history");
  };
  $scope.openAddItem = function() {
    $state.go("sellerHome");
  };
  $scope.openMyProfile = function() {
    $scope.close();
    $state.go("my-profile");
  };
  $scope.logOut = function() {
    $scope.close();
    localStorage.setItem("loginStatus", false);
    localStorage.setItem("authResponse", null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    $window.localStorage.setItem("logged", false);
    $window.localStorage.setItem("role", "3");
    $state.go("signin");
  };

  init();

  function init() {
    var localCategories = localStorage.getItem("cat_tabs");
    getAllCategories();
    getBestSeller();
    getFeatured();
    // if (
    //   localCategories != null &&
    //   localCategories != undefined &&
    //   localCategories != ""
    // ) {
    //   var tempTabs = JSON.parse(localCategories);
    //   if (tempTabs != null && tempTabs != undefined && tempTabs != "") {
    //     if (
    //       tempTabs.categories.length > 0 &&
    //       Date.parse(new Date()) - tempTabs.last_saved_at <
    //         refresh_after * 60 * 1000
    //     ) {
    //       initTabs(tempTabs.categories);
    //     } else {
    //       getAllCategories();
    //     }
    //   } else {
    //     getAllCategories();
    //   }
    // } else {
    //   getAllCategories();
    // }
  }

  //new slider

  $scope.ready = [];

  $scope.$on("$ionicView.afterEnter", function(event, data) {
    //initialisation of ready array to false
    angular.forEach($scope.catgs, function(value, key) {
      //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
      if (key === 0) {
        $scope.ready.push(0 + ": " + true);
      }
      //To stop loading other slides (pages) make sure to give 'false' to ther corresponding key in ready array
      $scope.ready.push(key + ": " + false);
    });
  });

  $scope.changeSlide = function(index) {
    //when slide is active : let angular to load it's content
    $scope.ready.push(index + ": " + true);
  };
}
