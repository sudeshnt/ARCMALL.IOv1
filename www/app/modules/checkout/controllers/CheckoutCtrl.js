'use strict';

angular.module('checkout.module').controller('CheckoutCtrl',CheckoutCtrl );

CheckoutCtrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService','$httpParamSerializer','$http'];

function CheckoutCtrl($scope,$state,$rootScope,serverConfig,httpService,$httpParamSerializer,$http) {

  $scope.personal_details = {};

  $scope.nextStep = function () {
    console.log($scope.personal_details);
  }

  function initCountries() {

    $http.get('https://restcountries.eu/rest/v2/all',{})
      .success(function(data,status){
        console.log(data);
      });

      // httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
      //   if(response.status === 200){
      //     console.log(response);
      //   }
      // });
  }

  init();

  function init() {
    initCountries();
    // initCountries();
  }
}
