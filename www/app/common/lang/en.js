/**
 * Created by SudeshNT on 11/4/2016.
 */
angular.module('lang_en',['pascalprecht.translate','ngSanitize'])
  .config(['$translateProvider',function($translateProvider){
    $translateProvider.translations('en', {
      SIGN_IN_WITH: "Sign in with",
      USE_EMAIL: "Use Email",
      SIGN_IN: "Sign In",
      REGISTER: "Register",
      EMAIL_ADDRESS: "Email Address",
      PASSWORD: "Password",
      NO_ACCOUNT:"No Account ?",
      FORGET_PASSWORD:'Forget Password ?'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }]);
