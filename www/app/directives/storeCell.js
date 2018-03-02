angular.module('arcMall').directive('storeCell', ['$timeout', '$parse', function ($timeout, $parse) {
  return {
    scope: {
       product: "=",
    },
    templateUrl:'app/modules/shop/templates/cells/store-cell.html',
    link: function ($scope, element, attrs) {
    },
  };
}]);
