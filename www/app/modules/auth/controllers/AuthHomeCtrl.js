'use strict';

angular.module('auth.module').controller('AuthHomeCtrl',AuthHomeCtrl );

AuthHomeCtrl.$inject = ['$scope', '$state', '$q', 'UserService', '$ionicLoading','httpService','serverConfig', '$ionicViewSwitcher'];

function AuthHomeCtrl($scope, $state, $q, UserService, $ionicLoading,httpService,serverConfig, $ionicViewSwitcher) {

  $scope.facebookLogIn = function(){
    facebookConnectPlugin.login(["public_profile"], function(userData){
        var extended_url = '/me?fields=email,first_name,last_name,picture,id,gender,birthday&access_token='+userData.authResponse.accessToken;
        httpService.getRequest(serverConfig.facebookAPI,extended_url,{}).then(function(response){
          if(response.status === 200 && response.error_warning == ""){
            // console.log(response);
            $state.go('home.new');
          }else{
            $scope.error = response.error_warning;
          }
        });
      },
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
          var extended_url = '/plus/v1/people/me?access_token='+obj.accessToken;
          httpService.getRequest(serverConfig.googleAPI,extended_url,{}).then(function(response){
            if(response.status === 200 && response.error_warning == ""){
              $state.go('home.new');
              // console.log(response);
            }else{
              $scope.error = response.error_warning;
            }
          });
        },
        function (msg){
          console.log(msg);
        }
      );
    }
  };

  $scope.signInPage = function(){
    $ionicViewSwitcher.nextDirection('forward');
    $state.go('authSignIn');
  };

  $scope.registerPage = function(){
    $state.go('authSignUp');
  };

  $scope.selectRolePage = function(){
    $state.go('selectAccountRole');
  };
}
