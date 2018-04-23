// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var arcMall = angular.module('arcMall', [
  'ionic',
  'ngMaterial',
  'pascalprecht.translate',
  'lang_en',
  'lang_zh',
  'modules',
  'ngCordova',
  'ionic-ratings',
  // 'tabSlideBox',
  'config.module',
  'ngCookies'
  // 'googleplus'
  // 'faceboook'
]);

// translation config
arcMall.config(function($translateProvider) {

    var lang = window.navigator.userLanguage || window.navigator.language;

    if(lang && lang != "") {
      lang = lang.substring(0,2);
    }
    else {
      lang = "en";
    }

    $translateProvider.preferredLanguage(lang);
    $translateProvider.forceAsyncReload(true);
    $translateProvider.fallbackLanguage(lang);
});

arcMall.config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
});

//
// arcMall.config(['GooglePlusProvider', function(GooglePlusProvider) {
//   GooglePlusProvider.init({
//     clientId: 'com.googleusercontent.apps.683451474237-kgbp6hbnbv3dtftbi3o1hmokm46od906'
//     // apiKey: 'AIzaSyBjWo11coJyU3CeABuuSdBDzjq7xh-EPPE'
//   });
// }]);

arcMall.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      console.log(window.navigator.userLanguage);
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

function initLanguage(lang) {
  var extended_url = '/common/language/language';
  var reqObj = {
    code:lang
  };
  var config = {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){

    if(response.status === 200){
      console.log("lang");
    }
  });
}
