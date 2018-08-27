'use strict';

angular.module('seller.module').controller('SellerHomeCtrl', SellerHomeCtrl);

SellerHomeCtrl.$inject = ['$scope','$rootScope', '$state','httpService','serverConfig',
'$timeout','$mdSidenav','$log','$cordovaActionSheet','$cordovaDevice',
'$cordovaFile','$cordovaFileTransfer','$ionicLoading','$ionicPopup', '$filter'];

function SellerHomeCtrl($scope, $rootScope, $state , httpService, serverConfig,
  $timeout, $mdSidenav, $log, $cordovaActionSheet, $cordovaDevice, 
  $cordovaFile, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $filter) {

  $scope.toggleSideBarHome = buildToggler('left');
  $scope.optionsCount = 0;
  $scope.showAddOptionPlaceholderButton = true;
  $scope.selection = {options:[], selectionId:0};
  $scope.selectedOptions = [];
  $scope.currentOption = {};
  $scope.showAddOptionButton = false;
  $scope.optionsChooseRequiredPassed = true;
  $scope.optionsQuantityRequiredPassed = true;
  
  let currentChosenOption = {};

  function setDefault() {
    
    // $scope.item.weight = 11;
    // $scope.item.height = 11;
    // $scope.item.name = "12";
    // $scope.item.quantity = 11;
    // $scope.item.price = 11;
    // $scope.item.description = "hello";
    // $scope.item.model = "model";
    // $scope.item.length = 11;
    // $scope.item.width = 11;

    $scope.item.currency_code = "USD"
  }

  // console.log($scope.authResponse);

  $scope.addedOptions = [];

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
  };

   $scope.weightMeasures =  [
    "Kilogram",
    "Gram",
    "Pound",
    "Ounce"
  ];

  $scope.dimensionMeasures =  [
    "Centimeter",
    "Millimeter",
    "Inch"
  ];

  $scope.item = {
    "category" : [],
    "images" : [],
    "product_option": []
  }

  // setDefault();

  function prepareItem() {
    var output = [];

    $scope.selectedOptions.forEach(function(item) {

      delete item['option_value'];
      
      var existing = output.filter(function(v, i) {
        return v.option_id == item.option_id;
      });

      if (existing.length > 0) {
        existing[0].product_option_value.push(item.product_option_value);
      }
      else {
        var option = Object.assign({}, item);
        var arr = [];
        arr.push(item.product_option_value);
        option.product_option_value = arr;
        output.push(option);
      }

      // if (existing.length) {
      //   var existingIndex = output.indexOf(existing[0]);
      //   output[existingIndex].product_option_value = output[existingIndex].product_option_value.push(value.product_option_value);
      // } else {
      //   // if (typeof value.option_value == 'string')
      //   //   value.product_option_value = [value.product_option_value];
      //   // output.push(value);
      // }
    });

    // var merged = mergeNames($scope.selectedOptions);

    $scope.selectedOptions = output;
    console.log("output");
    console.log(output);
  }

  $scope.setChosenOptionDetails = function(chosenOption) {
    currentChosenOption = JSON.parse(chosenOption);
    $scope.currentOption.product_option_value.option_value_id = String(currentChosenOption.option_value_id);
    $scope.currentOption.product_option_value.name = String(currentChosenOption.name);
  }

  $scope.addNewOptionPlaceholder = function() {
    $scope.selection = {};
    $scope.currentOption = {};
    $scope.optionsCount = $scope.optionsCount + 1;
    $scope.showAddOptionPlaceholderButton = false;
    console.log($scope.optionsCount)
  }

  $scope.addOption = function(option) {

    console.log(option);
    console.log(option.product_option_value.option_value_id)
    console.log(option.product_option_value.quantity)

    $scope.optionsChooseRequiredPassed = option.product_option_value.option_value_id != null;
    $scope.optionsQuantityRequiredPassed = option.product_option_value.quantity != null;

    if($scope.optionsChooseRequiredPassed && $scope.optionsQuantityRequiredPassed) {


      console.log('gone')
      option.newOptionId = guid();
      $scope.selectedOptions.push(Object.assign({}, option));
      $scope.showAddOptionPlaceholderButton = true;
      $scope.optionsCount = 0;
      $scope.showAddOptionButton = false;
      $scope.currentOption = {};
      $scope.optionsChooseRequiredPassed = true;
      $scope.optionsQuantityRequiredPassed = true;
      option.newOptionId = null;
      console.log($scope.selectedOptions);
      console.log($scope.selection.options[0].option_id)

      let chosenMainOption = $scope.options.filter(item => {
        return parseInt(item.option_id) == parseInt($scope.selection.options[0].option_id);
      });

      let chosensubOption = chosenMainOption[0].option_value.filter(item => {
        return parseInt(item.option_value_id) == parseInt(currentChosenOption.option_value_id);
      });

      chosensubOption[0].hide = true;
      
    }

  }

  $scope.getOptionsFor = function(selection) {

    var selectionOptions = $scope.selection.options;

    let option = $scope.options.filter(item => {
      return parseInt(item.option_id) == parseInt(selection.selectionId);
    });

    selectionOptions = option;
    $scope.selection = {selectionId: selection.selectionId, options: selectionOptions};
    $scope.currentOption = option[0];
    $scope.showAddOptionButton = true;
    $scope.currentOption['product_option_value'] = {subtract_quantity : true, required: false};
  }

  $scope.deleteOption = function(option) {
    console.log($scope.selectedOptions);

    var a = $scope.selectedOptions;
    a = a.filter(function (e) {
        return e.newOptionId == option.newOptionId;
    });

    var a = $scope.selectedOptions;
    a.splice(a.findIndex(e => e.newOptionId === option.newOptionId), 1);

    $scope.selectedOptions = a;

    let chosenMainOption = $scope.options.filter(item => {
      return parseInt(item.option_id) == parseInt($scope.selection.options[0].option_id);
    });

    let chosensubOption = chosenMainOption[0].option_value.filter(item => {
      return parseInt(item.option_value_id) == parseInt(currentChosenOption.option_value_id);
    });

    console.log(chosenMainOption)
    console.log(chosensubOption)

    chosensubOption[0].hide = false;
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

  function getOptions() {
    var extended_url = '/product/getoptions';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        $scope.options = response.data;
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

  function validateItem() {
    var itemValidated = true;
    if(!($scope.item.weight && $scope.item.height && $scope.item.length && 
      $scope.item.width && $scope.item.name && $scope.item.quantity && $scope.item.price &&
      $scope.item.description && $scope.item.model && $scope.item.category && $scope.item.currency_code &&
      $scope.item.dimensionMeasureUnit && $scope.item.weightMeasureUnit

    )) {
          itemValidated = false;
      }

    return itemValidated;
  }

  $scope.addItem = function () {

    if(validateItem()) {

      prepareItem();
      $scope.item.product_option = $scope.selectedOptions;
      var extended_url = '/product/addproduct';
      var req = Object.assign({}, $scope.item);
      if($scope.item.weight) {
        req['weight'] = $scope.item.weight+' '+$scope.item.weightMeasureUnit;
      }
      if($scope.item.height) {
        req['height'] = $scope.item.height+' '+$scope.item.dimensionMeasureUnit;
      }
      if($scope.item.length) {
        req['length'] = $scope.item.length+' '+$scope.item.dimensionMeasureUnit;
      }
      if($scope.item.width) {
        req['width'] = $scope.item.width+' '+$scope.item.dimensionMeasureUnit;
      }
      
      req.customer_id = $rootScope.authResponse.customer_id;
      req.currency_code = $scope.item.currency_code;
  
      for(var i in $scope.item.category){
        req.category.push($scope.item.category[i].category_id);
      }
      console.log(req);
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
  
      console.log(JSON.stringify(req));
      console.log(param(req));
  
      httpService.postRequest(serverConfig.clientAPI,extended_url, param(req),config).then(function(response){
        if(response) {
          console.log(response)
          if(response.status === 200){
            $scope.product = {
              "product_id" : response.data.product_id
            }
  
            console.log(response)
            $state.go('sellerHome2', {'product_id': response.data.product_id});
            console.log(response.data.product_id); // product id =248/249/250
          }else{
            $scope.error = response.error_warning;
          }
        }
      });

    }
    else {
      $scope.showAlert('Arcmall', $filter('translate')('PLEASE_VALIDATE'));
    }
  }

  var param = function(obj) {

    if ( ! angular.isObject( obj) ) { 
      return( ( obj== null ) ? "" : obj.toString() ); 
    }
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
  
    for(name in obj) {
  
      value = obj[name];
      if(value instanceof Array) {
        for(i in value) {
  
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue; 
          query += param(innerObj) + '&';
        }
  
      } else if(value instanceof Object) {
        for(subName in value) {
  
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
  
    return query.length ? query.substr(0, query.length - 1) : query;
  };

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
    getOptions();
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
    $rootScope.logOut();
  };
  $scope.openAddItem = function () {
    $state.go('sellerHome');
  };
  $scope.openMyProducts = function () {
    $state.go('sellerProducts');
  };
  $scope.openSettings = function () {
    $scope.close();
    $state.go('settings');
  };

  $scope.hideKeyboard = function() {
    Keyboard.hide();
  }

}
