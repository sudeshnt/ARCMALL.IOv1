(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('appConfig', {

      accountTypes : {
        BUYER:1,
        SELLER:2
      }

    });

})(angular);
