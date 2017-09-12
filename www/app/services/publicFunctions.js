(function (angular) {
  'use strict';

  angular.module('arcMall').service('publicFunc', publicFunc);

  publicFunc.$inject = [];

  function publicFunc() {
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
  }
})(angular);


