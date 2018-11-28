"use strict";

angular
  .module("shop.module")
  .controller("ViewOrderHistoryCtrl", ViewOrderHistoryCtrl);

ViewOrderHistoryCtrl.$inject = [
  "$scope",
  "$state",
  "$stateParams",
  "$rootScope",
  "$mdSidenav",
  "$log",
  "httpService",
  "serverConfig",
  "$httpParamSerializer"
];

function ViewOrderHistoryCtrl(
  $scope,
  $state,
  $stateParams,
  $rootScope,
  $mdSidenav,
  $log,
  httpService,
  serverConfig,
  $httpParamSerializer
) {
  // console.log($stateParams.order);

  if ($stateParams.order) {
    $scope.order = $stateParams.order;
    initOrder($scope.order.order_id);
  } else {
    $state.go("order-history");
  }

  function initOrder(order_id) {
    var extended_url = "/order_history/info";
    var reqObj = {
      order_id: order_id
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
        if (response.status === 200) {
          $scope.order = response.data;
        }
      });
  }

  $scope.goBack = function() {
    $state.go("dashboard");
  };
}
