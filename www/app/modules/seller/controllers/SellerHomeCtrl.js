'use strict';

angular.module('seller.module').controller('SellerHomeCtrl',SellerHomeCtrl );

SellerHomeCtrl.$inject = ['$scope', '$state','httpService','serverConfig','$timeout','$mdSidenav','$log'];

function SellerHomeCtrl($scope, $state ,httpService,serverConfig,$timeout,$mdSidenav,$log) {


  $scope.toggleSideBarHome = buildToggler('left');

  $scope.options = [
    {
      "name":'a',
      "value":'a'
    },{
      "name":'b',
      "value":'b'
    },{
      "name":'c',
      "value":'c'
    }
  ]

  $scope.category =  {
    "catLevel1" : null,
    "catLevel2" : null,
    "catLevel3" : null,
  }

  $scope.item = {
    "category" : [],
    "images" : [
    ]
  }

  function getAllCategories() {
    var extended_url = '/category/all';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        $scope.cat_tabs = response.data.categories;
      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  $scope.setItemCategory = function () {
    $scope.item.category.push({
      "category_id":$scope.cat_tabs[$scope.category.catLevel1].category_id,
      "name":$scope.cat_tabs[$scope.category.catLevel1].name
    });
    $scope.item.category.push({
      "category_id":$scope.cat_tabs[$scope.category.catLevel1].categories[$scope.category.catLevel2].category_id,
      "name":$scope.cat_tabs[$scope.category.catLevel1].categories[$scope.category.catLevel2].name
    });
    $scope.item.category.push({
      "category_id":$scope.cat_tabs[$scope.category.catLevel1].categories[$scope.category.catLevel2].categories[$scope.category.catLevel3].category_id,
      "name":$scope.cat_tabs[$scope.category.catLevel1].categories[$scope.category.catLevel2].categories[$scope.category.catLevel3].name
    });

    $scope.category =  {
      "catLevel1" : null,
      "catLevel2" : null,
      "catLevel3" : null,
    }
  };

  $scope.getPicture = function () {
    openCamera();
  };

  function openCamera(selection) {
    // var srcType = Camera.PictureSourceType.CAMERA;
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = getFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
      func(imageUri);
    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");
    }, options);
  }

  function pushImage(imgUri) {
    $scope.item.images.push[imgUri];
    console.log($scope.item.images);
    $scope.$apply();
  }

  function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
      pushImage(fileEntry.nativeURL);
      console.log("got file: " + fileEntry.fullPath);
    }, function () {
      createNewFileEntry(imgUri);
    });
  }
  function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
      dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
        console.log("got file: " + fileEntry.fullPath);
      }, onErrorCreateFile);
    }, onErrorResolveUrl);
  }

  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

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

  init();

  function init() {
    getAllCategories();
  }

}
