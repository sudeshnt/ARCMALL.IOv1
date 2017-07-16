/**
 * Created by SudeshNT on 11/4/2016.
 */
angular.module('lang_en',['pascalprecht.translate','ngSanitize'])
  .config(['$translateProvider',function($translateProvider){
    $translateProvider.translations('en', {
      SIGN_IN_WITH: "Sign in with",
      SIGN_UP_WITH: "Sign up with",
      ALREADY_REGISTERED: "Already Registered ?",
      USE_EMAIL: "Use Email",
      SIGN_IN: "Sign In",
      SIGN_UP: "Sign Up",
      REGISTER: "Register",
      EMAIL_ADDRESS: "Email Address",
      PASSWORD: "Password",
      NO_ACCOUNT:"No Account ?",
      FORGET_PASSWORD:'Forget Password ?',
      I_AM_SHOPPING_FOR:"I'm Shopping for...",
      WHAT_S_NEW:"what's new",
      JUST_FOR_YOU:"just for you",
      MOST_TRENDING:"Most Trending",
      DISCOVER:"discover",
      ALL_CATEGORIES:"All Categories",
      WISH_LIST:"Wish List",
      ADD_TO_WISH_LIST:"add to wish list",
      ADD_TO_CART:"add to cart",
      SEARCH_AN_ITEM:"Search an Item ...",
      BILLING_DETAILS:"Billing Details",
      YOUR_ORDER:"Your Order",
      SELECT_A_PAYMENT_METHOD:"select a payment method",
      SIZE:"size",
      SHIPPING_AND_HANDLING:"shipping and handling",
      ORDER_TOTAL:"order total",
      DESCRIPTION:"Description",
      REVIEWS:"Reviews",
      SHIPPING_INFORMATION:"Shipping Information",
      RETURN_POLICY:"Return Policy",
      LOG_OUT:"Log Out",
      ORDER_HISTORY:"Order History",
      NEW:"new",
      OUTLETS:"outlets",
      WHOLESALE:"wholesale",
      HOME:"Home",
      COMPANY_NAME:'Company Name',
      FIRST_NAME:'First Name',
      LAST_NAME:'Last Name',
      CONFIRM_PASSWORD:'Confirm Password',
      PLEASE_SELECT_ACCOUNT_ROLE:'Please select the role for your account',
      I_AM_BUYER:"I'm a Buyer",
      I_AM_SELLER:"I'm a Seller",
      SERVER_ERROR:'Server Error'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }]);
