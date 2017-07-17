(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('serverConfig', {

      clientAPI: {
        serviceName: 'Client API Services',
        serviceUrl: 'http://payleq8.com',
        port:'8080',
        base_url: '/Paylegateway/rest'
      }

    });

})(angular);
