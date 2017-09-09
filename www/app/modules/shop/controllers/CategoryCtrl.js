'use strict';

angular.module('shop.module').controller('CategoryCtrl',CategoryCtrl );

CategoryCtrl.$inject = ['$scope','$state','$rootScope','httpService','serverConfig','$ionicSlideBoxDelegate','$window', '$ionicGesture'];

function CategoryCtrl($scope,$state,$rootScope,httpService,serverConfig,$ionicSlideBoxDelegate,$window, $ionicGesture) {

  console.log(JSON.parse(localStorage.getItem('SELECTED_CATEGORY')));

  function getAllCategories() {
    var extended_url = '/category/all';
    var req = {};
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200 && !response.error_warning){
        $scope.cat_tabs = {};
        // get processed categories
        $scope.cat_tabs["NEW"] = $scope.getSubCategories(response.data.categories[0],2) ;
        $scope.cat_tabs["USED"] = $scope.getSubCategories(response.data.categories[1],2);
        $scope.cat_tabs["WHOLESALE"] = $scope.getSubCategories(response.data.categories[2],2)
        $ionicSlideBoxDelegate.update();
      }else{
        $scope.error = response.error_warning;
      }
    });
  }

  $scope.getSubCategories = function (arr,size) {
    var newNameArr = [];
    var newArr = [];
    var tempArr = []
    // newNameArr.push(arr.categories[0].name);
    if(arr.categories){
      for(var i=0; i<arr.categories.length; i++){
        tempArr = [];
        tempArr.push([arr.categories[i].categories[0]]);
        for (var j=1; j<arr.categories[i].categories.length; j+=size) {
          // newNameArr.push(arr.categories[i].name);
          // if(arr.categories[i+1])  newNameArr.push(arr.categories[i+1].name);
          tempArr.push(arr.categories[i].categories.slice(j, j+size));
        }
        newNameArr.push(
          {
            "name" : arr.categories[i].name,
            "id" : arr.categories[i].category_id,
            "sub_cats" : tempArr
          }
        );
        newArr.push(tempArr);
      }
      console.log(newNameArr);
    }
    return {
      "tabs" : newNameArr,
      "content" : newArr
    }
  };

  $scope.tabs = [
    {"text" : "ALL"},
    {"text" : "MEN"},
    {"text" : "WOMEN"},
    {"text" : "KIDS"},
    {"text" : "ACCESSORIES"},
    {"text" : "SUITS"}
  ];
  $scope.goHome = function () {
    $state.go('home.new');
  };
  $scope.goToItems = function (category) {
    $state.go('item-list',{category_id:category.category_id});
  };

  init();

  function init() {
    getAllCategories();
  }

  //new slider

  $scope.ready = [];
  $scope.catgs = [
    {
    id: 0,
    name: 'CATG1',
    items: [{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I1.png',
      name:'category1Item1',
      status:'OPEN'

    },{
      img:'img/G1I2.png',
      name:'category1Item2',
      status:'CLOSED'

    }]
  },
    {
    id: 1,
    name: 'CATG2',
    items: [{
      img:'img/G2I1.png',
      name:'category2Item1',
      status:'OPEN'

    },{
      img:'img/G2I2.png',
      name:'category2Item2',
      status:'CLOSED'

    }]
  },{
    id: 2,
    name: 'CATG3',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 3,
    name: 'CATG4',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 4,
    name: 'CATG5',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 5,
    name: 'CATG6',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 6,
    name: 'CATG7',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 7,
    name: 'CATG8',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 8,
    name: 'CATG9',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 9,
    name: 'CATG10',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 10,
    name: 'CATG11',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 11,
    name: 'CATG12',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 12,
    name: 'CATG13',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 13,
    name: 'CATG14',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 14,
    name: 'CATG15',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 15,
    name: 'CATG16',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 16,
    name: 'CATG17',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 17,
    name: 'CATG18',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 18,
    name: 'CATG19',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 19,
    name: 'CATG20',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  },{
    id: 20,
    name: 'CATG21',
    items: [{
      img:'img/G3I1.png',
      name:'category3Item1',
      status:'OPEN'

    },{
      img:'img/G3I2.png',
      name:'category3Item2',
      status:'CLOSED'

    }]
  }];


  $scope.$on("$ionicView.afterEnter", function (event, data) {

    //initialisation of ready array to false
    angular.forEach($scope.catgs, function (value, key)
    {
      //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
      if(key===0)
      {
        $scope.ready.push(0 + ': ' + true);
      }
      //To stop loading other slides (pages) make sure to give 'false' to ther corresponding key in ready array
      $scope.ready.push(key + ': ' + false);
    });
  });


  $scope.changeSlide = function (index)
  {
    //when slide is active : let angular to load it's content
    $scope.ready.push(index + ': ' + true);
  };

}
