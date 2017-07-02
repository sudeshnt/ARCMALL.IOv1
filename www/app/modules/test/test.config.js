'use strict';

var testModule = angular.module('test.module',[]);

testModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('test', {
      url: '/test',
      templateUrl: 'app/modules/test/templates/test.html',
      controller: 'TestCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "app/modules/test/templates/test.html",
      controller: 'TestCtrl'
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "app/modules/test/templates/test_2.html",
          controller: 'TestCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "app/modules/test/templates/test_2.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "app/modules/test/templates/test_2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "app/modules/test/templates/test_2.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "app/modules/test/templates/test_2.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "app/modules/test/templates/test_2.html"
        }
      }
    });
});
