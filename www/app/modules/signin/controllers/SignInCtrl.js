"use strict";

angular.module("signin.module").controller("SignInCtrl", SignInCtrl);

SignInCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "httpService",
  "serverConfig",
  "$httpParamSerializer",
  "$window",
  "sharedProperties",
  "$ionicHistory"
];

function SignInCtrl(
  $scope,
  $state,
  $rootScope,
  httpService,
  serverConfig,
  $httpParamSerializer,
  $window,
  sharedProperties,
  $ionicHistory
) {
  $scope.goback = function() {
    $state.go("dashboard");
  };

  $scope.openSeller = function() {
    $state.go("seller");
  };

  var fn = {},
    authorization = {};
  $scope.fn = fn;
  $scope.authorization = authorization;

  authorization = {
    username: "",
    password: ""
  };

  fn.login = function(credentials) {
    console.log("test");

    $scope.user = {
      email: credentials.username,
      // 'email' : 'harindamail@gmail.com',
      password: credentials.password
      // 'password' : 'benzc180'
    };

    var extended_url = "/user_login";
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
          $ionicHistory.clearHistory();
          $window.localStorage.setItem("logged", true);
          var authResponse = response.data.customer_info;
          console.log("role" + response.data.customer_info.customer_group_id);
          $window.localStorage.setItem(
            "role",
            response.data.customer_info.customer_group_id
          );
          $window.localStorage.setItem(
            "customer_id",
            response.data.customer_info.customer_id
          );

          $window.localStorage.setItem(
            "firstname",
            response.data.customer_info.firstname
          );
          $window.localStorage.setItem(
            "lastname",
            response.data.customer_info.lastname
          );
          $window.localStorage.setItem(
            "email",
            response.data.customer_info.email
          );
          $window.localStorage.setItem(
            "telephone",
            response.data.customer_info.telephone
          );
          console.log("role signin-->" + $window.localStorage.getItem("role"));
          console.log(
            "role dashboard-->" + response.data.customer_info.customer_group_id
          );
          // $rootScope.authResponse = response.data.customer_info;
          sharedProperties.setString(
            response.data.customer_info.customer_group_id
          );
          $state.go("dashboard");
        } else {
          alert(response.error_warning);
          $scope.error = response.error_warning;
        }
      });
  };
}
