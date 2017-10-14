'use strict';

angular.module('checkout.module').controller('CheckoutCtrl',CheckoutCtrl );

CheckoutCtrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService','$httpParamSerializer','$http'];

function CheckoutCtrl($scope,$state,$rootScope,serverConfig,httpService,$httpParamSerializer,$http) {

  $scope.personal_details = {};

  $scope.nextStep = function (){
    setShippingAddress();
    setPaymentAddress();
    // $state.go('checkout-step-2',{'persoanal_info':$scope.personal_details})
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
      "country_id":'94',
      "zone_id":'3513',
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
      "country_id":'94',
      "zone_id":'3513',
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

  }

  init();

  function init() {
    initCountries();
    // initCountries();
  }
}
