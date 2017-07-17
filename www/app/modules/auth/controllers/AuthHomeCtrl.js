'use strict';

angular.module('auth.module').controller('AuthHomeCtrl',AuthHomeCtrl );

AuthHomeCtrl.$inject = ['$scope', '$state', '$q', 'UserService', '$ionicLoading','httpService','serverConfig'];

function AuthHomeCtrl($scope, $state, $q, UserService, $ionicLoading,httpService,serverConfig) {

  var extended_url = '/merchant/regions';
  httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
    if(response.status === 200){
       console.log(response.data);
    }
  });

  // This is the success callback from the login method
  var fbLoginSuccess = function(userData){
    console.log("UserInfo: ", userData);
    $state.go('home.new');
  };
  $scope.facebookLogIn = function(){
    facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
      function loginError (error) {
        console.error(error)
      }
    );
  };

  $scope.googlePlusLogin = function(){
    if(window.plugins.googleplus){
      window.plugins.googleplus.login(
        {
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
        function (obj) {
          console.log(obj);
          $state.go('home.new');
          // alert(JSON.stringify(obj)); // do something useful instead of alerting
        },
        function (msg){
          console.log(msg);
          //alert('error: ' + msg);
        }
      );
    }
  };

  $scope.signInPage = function(){
    $state.go('authSignIn');
  };

  $scope.registerPage = function(){
    $state.go('authSignUp');
  };

  $scope.selectRolePage = function(){
    $state.go('selectAccountRole');
  };
}
