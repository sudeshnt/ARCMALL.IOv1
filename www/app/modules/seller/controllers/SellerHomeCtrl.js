'use strict';

angular.module('seller.module').controller('SellerHomeCtrl',SellerHomeCtrl );

SellerHomeCtrl.$inject = ['$scope','$rootScope', '$state','httpService','serverConfig','$httpParamSerializer','$timeout','$mdSidenav','$log','$cordovaActionSheet','$cordovaDevice','$cordovaFile','$cordovaFileTransfer','$ionicLoading'];

function SellerHomeCtrl($scope, $rootScope, $state , httpService,serverConfig,$httpParamSerializer,$timeout,$mdSidenav,$log,$cordovaActionSheet,$cordovaDevice,$cordovaFile,$cordovaFileTransfer,$ionicLoading) {

  $scope.toggleSideBarHome = buildToggler('left');

  // console.log($scope.authResponse);

  $scope.goHome = function () {
    $state.go('categories');
    // $state.go('home.new');
  };
  // $scope.product = {
  //   "product_id":248
  // }

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

  function getCurrency() {
    var extended_url = '/currency';
    httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
      if(response.status === 200){
        $scope.currencies = response.data.currencies;
      }
    });
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

  $scope.addItem = function () {
    // product.product_id ? goHome(); :
    if(!$scope.product){
      var extended_url = '/product/addproduct';
      var req = {
        "model" : $scope.item.model,
        "weight" : '',
        "height" : '',
        "name" : $scope.item.name,
        "quantity" : $scope.item.quantity,
        "price" : $scope.item.price,
        "description" : $scope.item.description,
        "mainimage" : '',
        "image1" : '',
        "image2" : '',
        "image3" : '',
        "image4" : '',
        "image5" : '',
        "image6" : '',
        "image7" : '',
        "category" : [],
        "customer_id" : $rootScope.authResponse.customer_id,
        "currency_code" :$scope.item.currency_code,
      }
      for(var i in $scope.item.category){
        req.category.push($scope.item.category[i].category_id);
      }
      // console.log(req);
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url,$httpParamSerializer(req),config).then(function(response){
        if(response.status === 200){
          $scope.product = {
            "product_id" : response.data.product_id
          }
          // console.log(response.data.product_id); // product id =248/249/250
        }else{
          $scope.error = response.error_warning;
        }
      });
    }else{
      $state.go('home.new');
    }
  }

  $scope.getPicture = function (image_type) {
    $scope.selected_image_type = image_type;
    var options = {
      title: 'Select '+image_type+' Image Source',
      buttonLabels: ['Load from Library', 'Use Camera'],
      addCancelButtonWithLabel: 'Cancel',
      androidEnableCancelButton : true,
    };
    $cordovaActionSheet.show(options).then(function(btnIndex) {
      var type = null;
      if (btnIndex === 1) {
        type = Camera.PictureSourceType.PHOTOLIBRARY;
      } else if (btnIndex === 2) {
        type = Camera.PictureSourceType.CAMERA;
      }
      if (type !== null) {
        selectPicture(type);
      }
    });
  };

  function selectPicture(sourceType) {
    var options = setOptions(sourceType);
    navigator.camera.getPicture(function cameraSuccess(imagePath) {
      // Grab the file name of the photo in the temporary directory
      var currentName = imagePath.replace(/^.*[\\\/]/, '');
      //Create a new name for the photo
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      // If you are trying to load image from the gallery on Android we need special treatment!
      if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        window.FilePath.resolveNativePath(imagePath, function(entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              // Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                uploadImage(newFileName);
              }, function(error){
                $scope.showAlert('Error', error.exception);
              });
            };
            function fail(e) {
              console.error('Error: ', e);
            }
          }
        );
      } else {
        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // Move the file to permanent storage
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
          uploadImage(newFileName);
        }, function(error){
          $scope.showAlert('Error', error.exception);
        });
      }
    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");
    }, options);
  }

  function uploadImage(newFileName) {
    // Destination URL
    var url = null;
    if($scope.selected_image_type==='Main'){
      url = "http://arcmall.alofatechlabs.com?route=api2/product/addmainimage";
    }else if($scope.selected_image_type==='Product'){
      url = "http://arcmall.alofatechlabs.com?route=api2/product/addproductimage";
    }

    // File for Upload
    var targetPath = $scope.pathForImage(newFileName);

    // File name only
    var filename = newFileName;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      // mimeType: "multipart/form-data",
      params : {'product_id': $scope.product.product_id}
      // params : {'product_id': filename}
    };

    $ionicLoading.show({
      template: '<ion-spinner icon="circles"></ion-spinner><br><span>Uploading</span>',
      hideOnStateChange: false
    });

    $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
      if($scope.selected_image_type==='Main'){
        $scope.item.mainImage = newFileName;
      }else if($scope.selected_image_type==='Product'){
        pushImage(newFileName);
      }
      $scope.selected_image_type = null;
      $ionicLoading.hide();
      // $scope.showAlert('Success', 'Image upload finished.');
    });
  }

  $scope.pathForImage = function(image) {
    if (image === null) {
      return '';
    } else {
      if(cordova){
        return cordova.file.dataDirectory + image;
      }
    }
  };

  function pushImage(imgName) {
    $scope.item.images.push(imgName);
  }

  function setOptions(srcType) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

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
    getCurrency();
    getAllCategories();
  }

  $scope.openCategories = function (){
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
    //$mdSidenav('right').close();
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
  $scope.logOut = function () {
    $scope.close();
    localStorage.setItem('loginStatus',false);
    localStorage.setItem('authResponse',null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
    $state.go('authSignIn');
  };
  $scope.openAddItem = function () {
    $state.go('sellerHome');
  };

}
