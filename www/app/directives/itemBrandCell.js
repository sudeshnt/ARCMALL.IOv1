angular.module('arcMall').directive('itemBrandCell', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    scope: {
       product: "=",
    },
    templateUrl:'app/modules/shop/templates/cells/item-brand-cell.html',
    link: function ($scope, element, attrs) {
    },
  };
}]);
