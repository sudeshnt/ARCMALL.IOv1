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
      FORGET_PASSWORD:'Forget Password ?',
      I_AM_SHOPPING_FOR:"I'm Shopping for...",
      WHAT_S_NEW:"what's new",
      JUST_FOR_YOU:"just for you",
      DISCOVER:"discover",
      ALL_CATEGORIES:"All Categories",
      WISH_LIST:"Wish List",
      ADD_TO_WISH_LIST:"add to wish list",
      ADD_TO_CART:"add to cart",
      SEARCH_AN_ITEM:"Search an Item ...",
      BILLING_DETAILS:"Billing Details",
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }]);
