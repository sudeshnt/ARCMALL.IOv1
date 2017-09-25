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
      addToPendingRequests(url,deferred);
      showLoading();
      $http.get(url,config)
        .success(function(data,status){
          var response = log(url,'GET',{},config,data,status);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data,status){
          var response = log(url,'GET',{},config,data,status);
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('SERVER_ERROR')).then();
          deferred.resolve(response);
        });
      return deferred.promise;
    }

    function postRequest(service,extended_url,req,config){
      var deferred = $q.defer();
      // var url = service.serviceUrl+service.base_url+extended_url;
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;

      addToPendingRequests(url,deferred);
      showLoading();
      $http.post(url,req,config)
        .success(function(data,status){
          var response = log(url,'POST',req,config,data,status);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data,status){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('SERVER_ERROR')).then();
          deferred.resolve(data);
        });
      return deferred.promise;
    }

    function putRequest(service,extended_url,req,config){
      var deferred = $q.defer();
      var url = service.serviceUrl+':'+service.port+service.base_url+extended_url;
      // config = {
      //   headers:{
      //     'Authorization': sessionId
      //   }
      // };
      addToPendingRequests(url,deferred);
      showLoading();
      $http.put(url,req,config)
        .success(function(data,status){
          var response = log(url,'PUT',req,config,data,status);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('SERVER_ERROR')).then();
          deferred.resolve(data);
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
      addToPendingRequests(url,deferred);
      showLoading();
      $http.delete(url,config)
        .success(function(data,status){
          var response = log(url,'DELETE',{},config,data,status);
          hideLoading();
          removeFromPendingRequests(url);
          deferred.resolve(response);
        })
        .error(function(data){
          hideLoading();
          //$cordovaToast.showLongBottom($filter('translate')('SERVER_ERROR')).then();
          deferred.resolve(data);
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

    function log(url,method,req,config,response_data,status){
      var response = {
        data:response_data,
        status:status
      };
      // console.log({
      //   "url" : url,
      //   "method" : method,
      //   "req" : req,
      //   "config" : config,
      //   "response" : response
      // });
      return response;
    }
    function printresponse(response){
      // console.log({
      //   "data" : response
      // });
    }

    return {
      getRequest: getRequest,
      postRequest: postRequest,
      putRequest: putRequest,
      deleteRequest: deleteRequest
    };
  }

})(angular);
