(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('serverConfig', {

      clientAPI: {
        serviceName: 'Client API Services',
        serviceUrl: 'http://arcmall.alofatechlabs.com',
        // serviceUrl: 'https://saasthara.com',
        port:'',
        base_url: '?route=api2'
        // base_url: '/i2cs/shops/demo/upload/index.php?route=api2'
      }

    });

})(angular);
