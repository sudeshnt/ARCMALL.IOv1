angular.module('arcMall').directive('sideNav', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    scope: true,
    templateUrl:'app/modules/shop/templates/side-nav.html',
    link: function ($scope, element, attrs) {
    },
  };
}]);
