"use strict";

angular.module("settings.module").controller("LanguagesCtrl", LanguagesCtrl);

CartCtrl.$inject = [
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
  "$ionicHistory",
  "$window"
];

function LanguagesCtrl(
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
  $ionicHistory,
  $window
) {
  var lang = $window.localStorage.getItem("language");
  if (!lang || lang == "" || lang === "undefined" || lang == null) {
    lang = "en";
  }

  $scope.choice = lang;

  $scope.languages = [
    { name: "English (US)", code: "en" },
    { name: "Simplified Chinese (简体中文)", code: "zh" }
  ];

  function isCurrentLang(language) {
    return language == lang;
  }

  $scope.changeLanguage = function(lang) {
    console.log("changed");
    $window.localStorage.removeItem("cat_tabs");
    $window.localStorage.setItem("language", lang);
    $window.localStorage.setItem("language_changed", true);
    location.reload();
  };
}
