(function (angular) {
  'use strict';

  angular.module('arcMall').service('publicFunc', publicFunc);

  publicFunc.$inject = [];

  function publicFunc() {

    var pending = [];
    this.get = function() {
      return pending;
    };

    this.devideArray = function (inputArray,columns){
      var processedArray = [];
      var subArrayIndex = 0;
      for(var i=0 ; i<inputArray.length ; i+=columns){
        processedArray.push([]);
        subArrayIndex++;
        for(var j=i;j<i+columns;j++){
          if(inputArray[j]){
            processedArray[subArrayIndex-1].push(inputArray[j]);
          }
        }
      }
      return processedArray;
    }

    // this.add = function(request) {
    //   pending.push(request);
    // };
    // this.remove = function(request) {
    //   pending = _.filter(pending, function(p) {
    //     return p.url !== request;
    //   });
    // };
    // this.cancelAll = function() {
    //   angular.forEach(pending, function(p) {
    //     p.canceller.resolve();
    //   });
    //   pending.length = 0;
    // };

  }
})(angular);


