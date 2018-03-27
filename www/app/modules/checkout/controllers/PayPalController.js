'use strict';

angular
    .module('checkout.module')
    .controller('PaymentPPExpressCtrl', function ($scope, $rootScope, $stateParams, $state, PaymentPPExpressService) {

        $scope.payment_initiated = false;
        console.log('payment_modules');

        $scope.pay = function () {
            $scope.payment_initiated = true;
            PaymentPPExpressService.OpenPaymetWindow().then(function (data) {
                // placeOrderOnSuccessReturn();
            }, function (data) {
                if (data && data.error)
                    alert(data.error);
                $scope.payment_initiated = false;
            });
        }

        $scope.$on('$ionicView.enter', function () {

          console.log("ionic view entering");
            //$scope.checkout = $stateParams.checkout;
            //$scope.total_amount_clean = $stateParams.total_amount_clean;
            $scope.success_state = $stateParams.success_state;
            //$scope.order_id = $stateParams.order_id;
            //$scope.currency = $stateParams.currency;
            $scope.total_amount = $stateParams.total_amount;
            $scope.payment_initiated = false;
            $scope.pay();
        });

        // var placeOrderOnSuccessReturn = function () {
        //     $ionicLoading.show();
        //
        //     CartService.AddOrder($rootScope.paymentAndShipping).then(function (data) {
        //         $ionicLoading.hide();
        //         // set cart badge to empty
        //         $rootScope.cartItemCount = "";
        //         if (data && data.error)
        //             alert(data.error);
        //         $state.go($scope.success_state, {}, { reload: true });
        //     });
        // }
    });
