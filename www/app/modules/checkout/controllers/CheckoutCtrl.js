'use strict';

angular.module('checkout.module').controller('CheckoutCtrl',CheckoutCtrl );

CheckoutCtrl.$inject = ['$scope','$state','$rootScope','$stateParams',
'serverConfig','httpService','$httpParamSerializer','$http', '$ionicPopup',
'$ionicViewSwitcher'];

function CheckoutCtrl($scope,$state,$rootScope,$stateParams,serverConfig,
  httpService,$httpParamSerializer,$http, $ionicPopup, $ionicViewSwitcher) {

  $scope.personal_details = {};


  function init() {
    initCountries();
    autofilCustomerDetails();
  }

  $scope.nextStep = function (){
    console.log("Next");
    // var req = addAddress();
    setShippingAddress();
    setPaymentAddress();
    $state.go('checkout-step-2',{'personal_info':$scope.personal_details})
     // $state.go("pp_express");

    // $state.go("payment_modules." + "pp_express" + ".home", { checkout: req, currency: "USD", total_amount: "$100.00", total_amount_clean: 100, success_state: "app.menu.cart.order_added" }, { reload: true });
  }

  $scope.changeShipping = function() {
    $ionicViewSwitcher.nextDirection('forward');

    // var address = $scope.address;

    // for(var index = 0; index<Object.keys(addresses).length; index++) {
    //   if (position != index) {
    //     var address = addresses[Object.keys(addresses)[index]];
    //     address.checked = false;
    //     lastpos = position;
    //
    //   }
    // }

    console.log("scope");
    console.log($scope.addresses);

    $state.go('shipping', {current_address:$scope.address, addresses: $scope.addresses});
  }

  $scope.goBack = function() {
    $state.go('shipping');
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

  function autofilCustomerDetails() {

    var authResponse = JSON.parse(localStorage.getItem('authResponse'));
    var firstname = authResponse.firstname;
    var lastname = authResponse.lastname;
    var email = authResponse.email;
    var telephone = authResponse.telephone;

    $scope.personal_details.firstname = firstname;
    $scope.personal_details.lastname = lastname;
    $scope.personal_details.email = email;
    $scope.personal_details.telephone = telephone;


    if($stateParams.current_address != null) {
      $scope.address = $stateParams.current_address;
      $scope.hasAddresses = true;
    }
    if($stateParams.addresses != null){
      $scope.addresses = $stateParams.addresses;
      console.log("$stateParams");
      console.log($stateParams);
    }
    // else {
    //   getAddresses();
    // }

  }

  function addAddress() {

    console.log($scope.personal_details);

    var extended_url = '/address/save';
    var reqObj = {
      "firstname":$scope.personal_details.firstname,
      "lastname":$scope.personal_details.lastname,
      "company":'',
      "address_1":$scope.personal_details.address_1,
      "address_2":$scope.personal_details.address_2,
      "city":$scope.personal_details.city,
      "postcode":$scope.personal_details.postcode,
      "country_id":$scope.personal_details.country_id,
      // "customer_id":$rootScope.authResponse.customer_id,
      "zone_id":$scope.personal_details.zone_id,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){

        console.log(response);
      }
    });

    return reqObj;
  }

 function setShippingAddress() {
    var extended_url = '/shipping/address';
    var reqObj = {
      "firstname":$scope.personal_details.firstname,
      "lastname":$scope.personal_details.lastname,
      "company":'',
      "address_1":$scope.personal_details.address_1,
      "address_2":$scope.personal_details.address_2,
      "city":$scope.personal_details.city,
      "postcode":$scope.personal_details.postcode,
      "country_id":$scope.personal_details.country_id,
      "zone_id":$scope.personal_details.zone_id,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        console.log(response);
      }
    });
  }

  function setPaymentAddress() {
    var extended_url = '/payment/address';
    var reqObj = {
      "firstname":$scope.personal_details.firstname,
      "lastname":$scope.personal_details.lastname,
      "company":'',
      "address_1":$scope.personal_details.address_1,
      "address_2":$scope.personal_details.address_2,
      "city":$scope.personal_details.city,
      "postcode":$scope.personal_details.postcode,
      "country_id":$scope.personal_details.country_id,
      "zone_id":$scope.personal_details.zone_id,
    };
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        console.log(response);
      }
    });
  }

  function initCountries() {
    var extended_url = '/address';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){

        $scope.countries = response.data.countries;


        if($stateParams.addresses == null) {
          var addresses = response.data.addresses;
          var firstAddress = addresses[Object.keys(addresses)[0]];
          // firstAddress.checked = true;

          console.log("addresses");
          console.log(addresses);


          $scope.addresses = addresses;
          $scope.address = firstAddress;
          $scope.hasAddresses =  Object.keys(addresses).length > 0;
        }
      }
    });
  }

  $scope.countryChanged = function () {
    if($scope.personal_details.country_id){
      //get zones
      var extended_url = '/address/getZones';
      var reqObj = {
        "country_id" : $scope.personal_details.country_id
      };
      var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
        if(response.status === 200){
          $scope.zones = response.data.zones;
          console.log($scope.zones);

          if($scope.zones.length>0){
            $scope.personalInfoForm.zone_id = $scope.zones[0].zone_id;
          }
        }
      });
    }
  };

  init();

  function getAddresses() {
    $scope.isCartLoaded = false;
    var extended_url = '/address';
    var reqObj = {};
    var config = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
      if(response.status === 200){
        var addresses = response.data.addresses;
        var firstAddress = addresses[Object.keys(addresses)[0]];
        firstAddress.checked = true;

        console.log("addresses");
        console.log(addresses);

        $scope.addresses = addresses;
        $scope.address = firstAddress;
        $scope.hasAddresses =  Object.keys(addresses).length > 0;
      }
    });
  }
}
