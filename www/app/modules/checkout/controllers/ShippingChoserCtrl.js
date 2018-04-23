'use strict';

angular.module('checkout.module').controller('ShippingChoserCtrl',  ShippingChoserCtrl);

ShippingChoserCtrl.$inject = ['$scope','$state','$rootScope', '$stateParams', '$timeout', '$mdBottomSheet',
'$mdToast','cartSev','serverConfig','httpService','$httpParamSerializer', '$ionicHistory', '$ionicPopup'];

function ShippingChoserCtrl($scope, $state, $rootScope, $stateParams, $timeout, $mdBottomSheet,
  $mdToast,cartSev,serverConfig,httpService,$httpParamSerializer, $ionicHistory, $ionicPopup) {

  var currentAddress = {};
  var currentAddresses = {};
  var lastpos = 0;


  function init() {
    getAddresses();
  }


  function getAddresses() {
    // $scope.isCartLoaded = false;
    // var extended_url = '/address';
    // var reqObj = {};
    // var config = {
    //   headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };
    // httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
    //   if(response.status === 200){
    //     var addresses = response.data.addresses;
    //     addresses[Object.keys(addresses)[0]].checked = true;
    //     $scope.addresses = addresses;
    //     currentAddress = addresses[Object.keys(addresses)[0]];
    //   }
    // });

    // console.log($stateParams.addresses);

    $scope.addresses = $stateParams.addresses;
    console.log("currentAddress");
    console.log($stateParams.addresses);
    currentAddress = $stateParams.current_address;

  }

  $scope.goBack = function() {

    $state.go('checkout-step-1', {current_address:currentAddress, addresses:currentAddresses});
  }

  function showPopup(text) {
    var confirmPopup = $ionicPopup.confirm({
         title: 'Arcmall',
         template: text
      });

      confirmPopup.then(function(res) {
         if(res) {
            // console.log('Sure!');
         } else {
            // console.log('Not sure!');
         }
      });
  }

  $scope.updateSelection = function(position, addresses) {
      console.log("pos"+position);
      currentAddresses = addresses;

      currentAddress = addresses[Object.keys(addresses)[position]];

      setShippingAndPaymentAddress(currentAddress, function(isSuccess){
        if(isSuccess) {
          for(var index = 0; index<Object.keys(addresses).length; index++) {
            if (position != index) {
              var address = addresses[Object.keys(addresses)[index]];
              address.checked = false;
              lastpos = position;

            }
            else if(position == index) {
              address.index = position;
              currentAddress = addresses[Object.keys(addresses)[position]];
              currentAddress.checked = true;
            }
          }
        }
        else {
          for(var index = 0; index<Object.keys(addresses).length; index++) {
            if (lastpos != index) {
              var address = addresses[Object.keys(addresses)[index]];
              address.checked = false;
            }
            else if(position == index){
              address.index = lastpos;
              currentAddress = addresses[Object.keys(addresses)[lastpos]];
              currentAddress.checked = true;
            }
          }
        }
      })


  }

  function setShippingAndPaymentAddress(currentAddress, callback) {

    console.log(currentAddress);

     var extended_url = '/shipping/address';
     var reqObj = {
       "firstname":currentAddress.firstname,
       "lastname":currentAddress.lastname,
       "company":'',
       "address_1":currentAddress.address_1,
       "address_2":currentAddress.address_2,
       "city":currentAddress.city,
       "postcode":currentAddress.postcode,
       "country_id":currentAddress.country_id,
       "zone_id":currentAddress.zone_id,
     };
     var config = {
       headers:{
         'Content-Type': 'application/x-www-form-urlencoded'
       }
     };
     httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){

       if(response.status === 200 && response.data.error == undefined){
         extended_url = '/payment/address';
         httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
           if(response.status === 200 && response.data.error == undefined){
              callback(true);
           }
           else if(response.data.error != undefined){
             callback(false);
             showPopup(response.data.error);
           }
           else {
             callback(false);
             showPopup(response.status);
           }
         });
       }
       else if(response.data.error != undefined){
         callback(false);
         showPopup(response.data.error);
       }
       else {
         callback(false);
         showPopup(response.status);
       }
     });
   }

   init();
}
