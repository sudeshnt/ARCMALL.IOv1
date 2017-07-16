(function (angular) {
  'use strict';

    angular.module('arcMall').service('httpService', httpService);

    httpService.$inject = ['$http', '$q', '$ionicLoading','pendingRequests','$filter'];
    // httpService.$inject = ['$http', '$q', '$ionicLoading','pendingRequests','$cordovaToast','$filter'];

    function httpService($http, $q, $ionicLoading,pendingRequests,$filter){
    // function httpService($http, $q, $ionicLoading,pendingRequests,$cordovaToast,$filter){

    function getRequest(service,extended_url,config){
      var deferred = $q.defer();
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;
      // config = {
      //   headers:{
      //     'Authorization': $scope.authUser.sessionId
      //   }
      // };
      log(url,'GET',{},config);
      addToPendingRequests(url,deferred);
      showLoading();
      $http.get(url,config)
        .success(function(response){
          printresponse(response);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('CONNECTION_ERROR')).then();
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function postRequest(service,extended_url,data,config){
      var deferred = $q.defer();
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;
      // config = {
      //   headers:{
      //     'Authorization': $scope.authUser
      //   }
      // };
      log(url,'POST',data,config);
      addToPendingRequests(url,deferred);
      showLoading();
      $http.post(url,data,config)
        .success(function(response){
          printresponse(response);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data,status){
          console.log(status);
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('CONNECTION_ERROR')).then();
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function putRequest(service,extended_url,data,config){
      var deferred = $q.defer();
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;
      // config = {
      //   headers:{
      //     'Authorization': sessionId
      //   }
      // };
      log(url,'PUT',data,config);
      addToPendingRequests(url,deferred);
      showLoading();
      $http.put(url,data,config)
        .success(function(response){
          printresponse(response);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('CONNECTION_ERROR')).then();
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function deleteRequest(service,extended_url,config){
      var deferred = $q.defer();
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;
      // config = {
      //   headers:{
      //     'Authorization': sessionId
      //   }
      // };
      log(url,'DELETE',{},config);
      addToPendingRequests(url,deferred);
      showLoading();
      $http.delete(url,config)
        .success(function(response){
          printresponse(response);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('CONNECTION_ERROR')).then();
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function showLoading(){
      $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>',
        hideOnStateChange: true
      });
    }

    function hideLoading(){
      $ionicLoading.hide();
    }

    function addToPendingRequests(url,deferred){
      pendingRequests.add({
        url: url,
        canceller: deferred
      });
    }

    function removeFromPendingRequests(url){
      pendingRequests.remove(url);
    }

    function log(url,method,data,config){
      console.log({
        "url" : url,
        "method" : method,
        "data" : data,
        "config" : config
      });
    }
    function printresponse(response){
      console.log({
        "data" : response
      });
    }

    return {
      getRequest: getRequest,
      postRequest: postRequest,
      putRequest: putRequest,
      deleteRequest: deleteRequest
    };
  }

})(angular);
