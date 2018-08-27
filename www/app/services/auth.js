(function (angular) {
  'use strict';

    angular.module('arcMall').service('Auth', function($q, $ionicLoading) {

      this.getLoginStatus = function() {
         var defer = $q.defer();
   
         FB.getLoginStatus(function(response) {
       
            if (response.status === "connected") {
               console.log(JSON.stringify(response));
            } else {
               console.log("Not logged in");
            }
         });
   
         return defer.promise;
      }
      
      this.loginFacebook = function() {
         var defer = $q.defer();
   
         FB.login(function(response) {
       
            if (response.status === "connected") {
               console.log(JSON.stringify(response));
            } else {
               console.log("Not logged in!");
            }
         });
   
         return defer.promise;
      }
   
      this.logoutFacebook = function() {
         var defer = $q.defer();
   
         FB.logout(function(response) {
            console.log('You are logged out!');
         });
   
         return defer.promise;
      }
   
      this.getFacebookApi = function() {
         var defer = $q.defer();
   
         FB.api("me/?fields = id,email", [], function(response) {
       
            if (response.error) {
               console.log(JSON.stringify(response.error));
            } else {
               console.log(JSON.stringify(response));
            }
         });
   
         return defer.promise;
      }
   });

})(angular);
