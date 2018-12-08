"use strict";

angular.module("settings.module").controller("SettingsCtrl", SettingsCtrl);

SettingsCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "$timeout",
  "$mdBottomSheet",
  "$mdToast",
  "cartSev",
  "serverConfig",
  "httpService",
  "$httpParamSerializer",
  "$ionicHistory"
];

function SettingsCtrl(
  $scope,
  $state,
  $rootScope,
  $timeout,
  $mdBottomSheet,
  $mdToast,
  cartSev,
  serverConfig,
  httpService,
  $httpParamSerializer,
  $ionicHistory
) {
  $scope.goToLanguages = function() {
    $state.go("languages");
  };
}
