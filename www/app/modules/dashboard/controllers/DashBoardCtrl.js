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
  "$httpParamSerializer",
  "$ionicHistory"
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
  $httpParamSerializer,
  $ionicHistory
) {
  $scope.next1 = function() {
    $ionicScrollDelegate.$getByHandle("mysliderone").scrollBy(150, 0, true);
  };

  /**code for auto complete */
  $scope.model = "";
  $scope.clickedValueModel = "";
  $scope.removedValueModel = "";
  $scope.search_text = "";

  console.log($scope.search_text);
  console.log("role-->" + $window.localStorage.getItem("role"));
  console.log("role 1234-->" + sharedProperties.getString());

  getAllCategories();
  getBestSeller();
  getFeatured();

  $scope.allImages = [
    "app/modules/dashboard/img/1.png",
    "app/modules/dashboard/img/1.png",
    "app/modules/dashboard/img/1.png"
  ];

  $scope.bySearch = function(query) {
    if (query) {
      $scope.user = {
        search: query,
        limit: 10
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
            $scope.arry_item = authResponse;
            // $state.go("dashboard");
            // $state.go('home.new');
          } else {
            $scope.error = response.error_warning;
          }
        });

      return authResponse;
    }
    return {
      items: []
    };
  };

  $scope.goToItems = function(category) {
    $state.go("item-list", {
      category_id: category.category_id
    });
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
    $scope.userrole = sharedProperties.getString();
    $scope.role = $window.localStorage.getItem("role");

    var extended_url = "/category/home";
    var req = {};
    httpService
      .getRequest(serverConfig.clientAPI, extended_url, req, {})
      .then(function(response) {
        if (response.status === 200 && !response.error_warning) {
          console.log(response.data);

          $scope.allCategories = response.data.categories;
          console.log("all categories" + $scope.allCategories);
          console.log("all categories name" + $scope.allCategories[0].name);
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
        } else {
          $scope.error = response.error_warning;
        }
      });
  }

  $scope.categories = ["image2.png", "image3.png", "image4.png", "image5.png"];
  $scope.goHome = function() {
    $state.go("home.new");
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
    $ionicHistory.clearHistory();
    localStorage.setItem("loginStatus", false);
    localStorage.setItem("authResponse", null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    $window.localStorage.setItem("logged", false);
    $window.localStorage.setItem("role", "3");
    $state.go("signin");
  };

  // init();

  // function init() {
  //   console.log("run--->");
  // }

  //new slider

  $scope.ready = [];

  // $scope.$on("$ionicView.afterEnter", function(event, data) {
  //   //initialisation of ready array to false
  //   angular.forEach($scope.catgs, function(value, key) {
  //     //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
  //     if (key === 0) {
  //       $scope.ready.push(0 + ": " + true);
  //     }
  //     //To stop loading other slides (pages) make sure to give 'false' to ther corresponding key in ready array
  //     $scope.ready.push(key + ": " + false);
  //   });
  // });

  // $scope.changeSlide = function(index) {
  //   //when slide is active : let angular to load it's content
  //   $scope.ready.push(index + ": " + true);
  // };
}
