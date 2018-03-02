angular.module('arcMall').directive('itemCell', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    scope: {
       product: "=",
    },
    templateUrl:'app/modules/shop/templates/cells/item-cell.html',
    link: function ($scope, element, attrs) {
    },
  };
}]);
