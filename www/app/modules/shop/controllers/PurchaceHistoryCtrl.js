'use strict';

angular.module('shop.module').controller('PurchaceHistoryCtrl', PurchaceHistoryCtrl );

PurchaceHistoryCtrl.$inject = ['$scope','$state','$rootScope','$stateParams','serverConfig','httpService','$httpParamSerializer','publicFunc'];

function PurchaceHistoryCtrl($scope,$state,$rootScope,$stateParams,serverConfig,httpService,$httpParamSerializer,publicFunc) {

  init();


  function getOrders () {
    var extended_url = '/order_history';
    // var reqObj = {
    //   "path":id
    // };
    // var config = {
    //   headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };
    // httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(response){
    //   if(response.status === 200){
    //     $scope.category = response.data;
    //     $scope.category.products = publicFunc.devideArray($scope.category.products,2);
    //   }
    // });

    httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response) {
      if(response.status === 200 && response.error_warning == "") {
        response.data = {
            "orders": [
                {
                    "order_id": "20",
                    "name": "sahan nanayakkara",
                    "status": "Pending",
                    "date_added": "01/06/2017",
                    "products": 1,
                    "total": "$49.00"
                },
                {
                    "order_id": "18",
                    "name": "sahan nanayakkara",
                    "status": "Pending",
                    "date_added": "27/05/2017",
                    "products": 1,
                    "total": "£19.53"
                },
                {
                    "order_id": "17",
                    "name": "sahan nanayakkara",
                    "status": "Pending",
                    "date_added": "24/05/2017",
                    "products": 1,
                    "total": "$35.00"
                }
            ]
        }

        $state.orders =  response.data;

        var reqObj = {
          "order_id":response.data["orders"][0]["order_id"];
        };
        var config = {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        // httpService.postRequest(serverConfig.clientAPI,extended_url, $httpParamSerializer(reqObj),config).then(function(productResponse) {
        //   if(response.status === 200){
        //     $scope.products = {
        //                         "error_warning": "",
        //                         "success": "",
        //                         "invoice_no": "",
        //                         "order_id": "20",
        //                         "date_added": "01/06/2017",
        //                         "payment_address": "sahan nanayakkara<br />441/3/1, Himbutana Lane, Mulleriyawa<br />Colombo 10620<br />Western<br />Sri Lanka",
        //                         "payment_method": "Cash On Delivery",
        //                         "shipping_address": "sahan nanayakkara<br />441/3/1, Himbutana Lane, Mulleriyawa<br />Colombo 10620<br />Western<br />Sri Lanka",
        //                         "shipping_method": "Flat Shipping Rate",
        //                         "products": [
        //                             {
        //                                 "name": "2 in 1 Makeup Face Pressed Loose Powder ",
        //                                 "model": "chanel",
        //                                 "option": [],
        //                                 "quantity": "1",
        //                                 "price": "$44.00",
        //                                 "total": "$44.00",
        //                                 "reorder": "http://arcmall.alofatechlabs.com/index.php?route=account/order/reorder&amp;order_id=20&amp;order_product_id=34",
        //                                 "return": "http://arcmall.alofatechlabs.com/index.php?route=account/return/add&amp;order_id=20&amp;product_id=150"
        //                             }
        //                         ],
        //                         "vouchers": [],
        //                         "totals": [
        //                             {
        //                                 "title": "Sub-Total",
        //                                 "text": "$44.00"
        //                             },
        //                             {
        //                                 "title": "Flat Shipping Rate",
        //                                 "text": "$5.00"
        //                             },
        //                             {
        //                                 "title": "Total",
        //                                 "text": "$49.00"
        //                             }
        //                         ],
        //                         "comment": "",
        //                         "histories": [
        //                             {
        //                                 "date_added": "01/06/2017",
        //                                 "status": "Pending",
        //                                 "comment": ""
        //                             }
        //                           ]
        //                       }
        //
        //
        //               console.log(response);
        //               $state.go('purchase-history');
        //             }
        //           });
                }
                else {
                  $scope.error = response.error_warning;
                }
              });
            }

  // $scope.openItemDetails = function(product_id){
  //   $state.go('item',{category_id:$scope.category_id,product_id:product_id});
  // };

  function init(){
    getOrders();
  }

}
