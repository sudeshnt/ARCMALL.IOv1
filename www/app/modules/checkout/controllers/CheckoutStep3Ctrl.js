"use strict";

angular
  .module("checkout.module")
  .controller("CheckoutStep3Ctrl", CheckoutStep3Ctrl);

CheckoutStep3Ctrl.$inject = [
  "$scope",
  "$stateParams",
  "$ionicHistory",
  "PaypalFactory",
  "$state",
  "$rootScope",
  "serverConfig",
  "httpService",
  "$httpParamSerializer"
];

function CheckoutStep3Ctrl(
  $scope,
  $stateParams,
  $ionicHistory,
  PaypalFactory,
  $state,
  $rootScope,
  serverConfig,
  httpService,
  $httpParamSerializer
) {
  if ($stateParams.personal_info) {
    $scope.personal_info = $stateParams.personal_info;
    console.log($scope.personal_info);
  } else {
    $state.go("cart");
  }

  if ($stateParams.payment_and_shipping) {
    $scope.payment_and_shipping = $stateParams.payment_and_shipping;
  } else {
    $state.go("cart");
  }

  //$scope.processOrder = function () {
  function confirmOrder(order_id) {
    //console.log($rootScope.authResponse.customer_id);
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    var value = $rootScope.cart.total.replace("$", "");
    var total = Number(value);
    $scope.subscriptionName = "Total Amount";
    $scope.subscriptionPrice = total;

    PaypalFactory.initPaymentUI().then(function() {
      PaypalFactory.makePayment(
        $scope.subscriptionPrice,
        $scope.subscriptionName
      ).then(
        function(data) {
          var extended_url = "/order/history";
          var reqObj = {
            "order_status_id":5,
            "order_id":order_id,
          };
          var config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          };
          httpService
            .postRequest(
              serverConfig.clientAPI,
              extended_url,
              $httpParamSerializer(reqObj),
              config
            )
            .then(function(response) {
              console.log(response);
              if (response.status === 200) {
                console.log("success");
                $state.go("success");
              }
            });
        },
        function(err) {
          $state.go("error");
        }
      );
    });
  }

  // function confirmOrder() {
  $scope.processOrder = function() {
    var key = Object.keys(
      JSON.parse($scope.payment_and_shipping.shipping_method).quote
    )[0];
    var extended_url = "/order/add";
    if($rootScope.authResponse){
      var reqObj = {
          "shipping_method":JSON.parse($scope.payment_and_shipping.shipping_method).quote[key].code,
          "payment_method":$scope.payment_and_shipping.payment_method,
          "comment":$scope.personal_info.comment,
          "affiliate_id":'',
        };
    }else{
        var reqObj = {
            "shipping_method":JSON.parse($scope.payment_and_shipping.shipping_method).quote[key].code,
            "payment_method":$scope.payment_and_shipping.payment_method,
            "comment":$scope.personal_info.comment,
            "affiliate_id":'',
          };
    }

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    httpService
      .postRequest(
        serverConfig.clientAPI,
        extended_url,
        $httpParamSerializer(reqObj),
        config
      )
      .then(function(response) {
        if (response.status === 200 && !response.data.error) {
          confirmOrder(response.data.order_id);
        } else {
          alert("Transaction Canceled. Please Try Again");
          $state.go("dashboard");
        }
      });
  };
}
