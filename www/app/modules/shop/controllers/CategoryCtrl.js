"use strict";

angular.module("shop.module").controller("CategoryCtrl", CategoryCtrl);

CategoryCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "$stateParams",
  "httpService",
  "serverConfig",
  "$ionicSlideBoxDelegate",
  "$window",
  "$ionicGesture",
  "$timeout",
  "$mdSidenav",
  "$log"
];

function CategoryCtrl(
  $scope,
  $state,
  $rootScope,
  $stateParams,
  httpService,
  serverConfig,
  $ionicSlideBoxDelegate,
  $window,
  $ionicGesture,
  $timeout,
  $mdSidenav,
  $log
) {
  var type = $stateParams.type;

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
      .postRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200 && !response.error_warning) {
          localStorage.setItem(
            "cat_tabs",
            JSON.stringify({
              categories: response.data.categories,
              last_saved_at: Date.parse(new Date())
            })
          );
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
    $state.go($state.current, { type: value }, { reload: true });
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
    { text: "ALL" },
    { text: "MEN" },
    { text: "WOMEN" },
    { text: "KIDS" },
    { text: "ACCESSORIES" },
    { text: "SUITS" }
  ];
  $scope.categories = ["image2.png", "image3.png", "image4.png", "image5.png"];

  $scope.goHome = function() {
    $state.go("home.new");
  };
  $scope.goToItems = function(category) {
    $state.go("item-list", { category_id: category.category_id });
  };
  $scope.goToSearch = function() {
    $state.go("item-search");
  };

  $scope.openCategories = function() {
    $scope.close();
    $state.go("categories");
  };
  $scope.openWishList = function() {
    $scope.close();
    $state.go("wish-list");
  };
  $scope.openSignIn = function() {
    $scope.close();
    $state.go("authHome");
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
    $state.go("authSignIn");
  };

  init();

  function init() {
    var localCategories = localStorage.getItem("cat_tabs");
    if (
      localCategories != null &&
      localCategories != undefined &&
      localCategories != ""
    ) {
      var tempTabs = JSON.parse(localCategories);
      if (tempTabs != null && tempTabs != undefined && tempTabs != "") {
        if (
          tempTabs.categories.length > 0 &&
          Date.parse(new Date()) - tempTabs.last_saved_at <
            refresh_after * 60 * 1000
        ) {
          initTabs(tempTabs.categories);
        } else {
          getAllCategories();
        }
      } else {
        getAllCategories();
      }
    } else {
      getAllCategories();
    }
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
