(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('serverConfig', {

      clientAPI: {
        serviceName: 'Client API Services',
        serviceUrl: 'https://saasthara.com',
        port:'',
        base_url: '/i2cs/shops/demo/upload/index.php?route=api2'
      }

    });

})(angular);
