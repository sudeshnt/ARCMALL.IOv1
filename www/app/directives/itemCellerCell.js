angular.module('arcMall').directive('itemSellerCell', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
      scope: {
         product: "=",
      },
      templateUrl:'app/modules/seller/templates/cells/item-seller-cell.html',
      link: function ($scope, element, attrs) {
      },
    };
  }]);
  