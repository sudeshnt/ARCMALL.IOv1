'use strict';

angular.module('checkout.module').controller('CheckoutCtrl',CheckoutCtrl );

CheckoutCtrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService','$httpParamSerializer','$http'];

function CheckoutCtrl($scope,$state,$rootScope,serverConfig,httpService,$httpParamSerializer,$http) {

  //console.log($rootScope.authResponse);

  if($rootScope.authResponse){
    $scope.personal_details = $rootScope.authResponse;
  }else{
    $scope.personal_details = {};
  }

  var checked = 1 ;

  $scope.checkbox = function (){
    checked = 1;
  }

  $scope.nextStep = function (){
    //console.log(checked);
    if(checked){
    addCustomer();
    addAddress();
    setShippingAddress();
    setPaymentAddress();
    $state.go('checkout-step-2',{'personal_info':$scope.personal_details})
    }
    
  }

  //added by Nisal
  function addCustomer() {
    var extended_url = '/customer';

    if($rootScope.authResponse){
      var reqObj = {
        "firstname":$scope.personal_details.firstname,
        "lastname":$scope.personal_details.lastname,
        "email":$scope.personal_details.email,
        "telephone":$scope.personal_details.telephone,
        "customer_id":Number($rootScope.authResponse.customer_id),
      };
    }else{
      var reqObj = {
        "firstname":$scope.personal_details.firstname,
        "lastname":$scope.personal_details.lastname,
        "email":$scope.personal_details.email,
        "telephone":$scope.personal_details.telephone,
      };
    }
    
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

  function addAddress() {
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
        // $scope.personal_details.country_id = angular.copy($scope.countries[0].country_id);
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

  function init() {
    initCountries();
  }
}
