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
      SHIPPING_AND_HANDLING:"shipping method",
      PAYMENT_METHOD:"payment method",
      ORDER_TOTAL:"order total",
      DESCRIPTION:"Description",
      REVIEWS:"Reviews",
      SHIPPING_INFORMATION:"Shipping Information",
      SHIPPING_ADDRESS:"Shipping Address",
      BILLING_ADDRESS:"Billing Address",
      RETURN_POLICY:"Return Policy",
      BUYER_PROTECTION:"Buyer Protection",
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
      SERVER_ERROR:'Server Error',
      ADD_ITEM:'Add Item',
      WHAT_IS_YOUR_PRODUCT_NAME:'What is your product name',
      TELL_US_ABOUT_YOUR_ITEM:'Tell us about your item',
      WHAT_IS_THE_MODEL_OF_YOUR_PRODUCT:'What is the model of your product',
      WHAT_IS_THE_PRICE_OF_YOUR_PRODUCT:'price of your product',
      WHAT_IS_THE_HEIGHT_OF_YOUR_PRODUCT:'height of your product',
      WHAT_IS_THE_WEIGHT_OF_YOUR_PRODUCT:'weight of your product',
      QUANTITY_AVAILABLE:'Quantity available',
      SAVE_ITEM:'Save Item',
      MY_PROFILE:'My Profile',
      CHANGE_PASSWORD:'Change Password',
      MOBILE:'Mobile Number',
      EMAIL:'Email Address',
      ORDER_ID:'Order Id',
      CHECKOUT_STEP_ONE:'Checkout - Step 1',
      CHECKOUT_STEP_TWO:'Checkout - Step 2',
      CHECKOUT_STEP_THREE:'Checkout - Step 3',
      COMMENTS: "Comments",
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }]);
