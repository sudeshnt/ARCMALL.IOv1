angular.module('arcMall').directive('cartCell', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    scope: {
       item: "=",
    },
    templateUrl:'app/modules/checkout/templates/cells/cart-cell.html',
    link: function ($scope, element, attrs) {
    },
  };
}]);
