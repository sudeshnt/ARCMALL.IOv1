(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('appConfig', {

      SocialNetworksProviderKEY : {
        "GooglePlus":'com.googleusercontent.apps.683451474237-kgbp6hbnbv3dtftbi3o1hmokm46od906',
        "Facebook":'1823221184659287',
      },

      accountTypes : {
        BUYER:0,
        SELLER:1
      }

    });

})(angular);
