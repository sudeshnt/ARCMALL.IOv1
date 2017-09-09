(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('appConfig', {

      accountTypes : {
        BUYER:0,
        SELLER:1
      }

    });

})(angular);
