
'use strict';

angular.module('settings.module').controller('LanguagesCtrl', LanguagesCtrl);

CartCtrl.$inject = ['$scope','$state','$rootScope','$timeout', '$mdBottomSheet',
'$mdToast','cartSev','serverConfig','httpService','$httpParamSerializer', '$ionicHistory'];

function LanguagesCtrl($scope,$state,$rootScope, $timeout, $mdBottomSheet,
  $mdToast,cartSev,serverConfig,httpService,$httpParamSerializer, $ionicHistory) {

    var lang = localStorage.getItem('language');
    if(!lang || lang == '' || lang === 'undefined' || lang == null){
      lang = 'en';
    }

    $scope.choice = lang;

    $scope.languages = [
      { name: 'English (US)', code: 'en'},
      { name: 'Simplified Chinese (简体中文)', code:'zh'},
    ];

    function isCurrentLang(language) {
      return (language == lang)
    }

    $scope.changeLanguage = function(lang){
      localStorage.removeItem('cat_tabs');
      localStorage.setItem('language', lang);
      localStorage.setItem('language_changed', true);      
      location.reload();
    }
}
