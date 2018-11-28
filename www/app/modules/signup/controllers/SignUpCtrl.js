"use strict";

angular.module("signup.module").controller("SignUpCtrl", SignUpCtrl);

SignUpCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "$stateParams",
  "httpService",
  "serverConfig",
  "$httpParamSerializer",

  "sharedProperties"
];

function SignUpCtrl(
  $scope,
  $state,
  $rootScope,
  $stateParams,
  httpService,
  serverConfig,
  $httpParamSerializer,
  sharedProperties
) {
  var fn = {},
    authorization = {};
  $scope.fn = fn;
  $scope.authorization = authorization;

  console.log("role" + $stateParams.role);

  if ($stateParams.role == "seller") {
    $scope.number = "2";
  } else {
    $scope.number = "1";
  }
  authorization = {
    username: "",
    password: ""
  };
  $scope.goback = function() {
    $state.go("seller");
  };

  fn.signup = function(credentials) {
    if (credentials.confirm != credentials.password) {
      alert("Password confirmation does not match password");
    } else {
      console.log("" + $scope.number + "-->" + credentials.company);
      if ($scope.number == "2" && typeof credentials.company == "undefined") {
        alert("Company name should be inserted");
      } else {
        $scope.user = {
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          confirm: credentials.confirm,
          email: credentials.email,
          custom_field: $scope.number,
          customer_group_id: $scope.number,
          password: credentials.password
        };

        var extended_url = "/user_register";
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
              var authResponse = response.data.customer_info;
              alert("Your account information is updated successfully!");
              console.log(authResponse);
              $state.go("dashboard");
              // $state.go('home.new');
            } else {
              alert(response.error_warning);
              $scope.error = response.error_warning;
            }
          });
      }
    }
  };
}
