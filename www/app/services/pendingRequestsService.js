(function (angular) {
  'use strict';

    angular.module('arcMall').service('pendingRequests', pendingRequests);

    pendingRequests.$inject = [];

    function pendingRequests() {

      var pending = [];
      this.get = function() {
        return pending;
      };
      this.add = function(request) {
        pending.push(request);
      };
      this.remove = function(request) {
        pending = _.filter(pending, function(p) {
          return p.url !== request;
        });
      };
      this.cancelAll = function() {
        angular.forEach(pending, function(p) {
          p.canceller.resolve();
        });
        pending.length = 0;
      };

    }
})(angular);


