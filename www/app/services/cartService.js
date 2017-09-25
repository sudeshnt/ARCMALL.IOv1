(function (angular) {
    'use strict';

    angular.module('arcMall').factory('cartSev', cartSev);

    cartSev.$inject = [];

    function cartSev() {
        var shopping_cart = new cart();
        return {
            shoppingCart: shopping_cart
        };
    };

    function cart(){
        this.name = "shoppingCart";
        this.cart = {};
        this.isEmpty = true;
        this.loadCart();
    };

    cart.prototype.loadCart = function(){
        var cart = localStorage != null ? localStorage[this.name] : null;
        if(cart != null && JSON != null){
            this.cart = JSON.parse(cart).cart;
            this.isEmpty = JSON.parse(cart).isEmpty;
        };
    };

    cart.prototype.saveCart = function () {
        if (localStorage != null && JSON != null) {
            var cart = {
                "cart":this.cart,
                "isEmpty":this.isEmpty
            }
            localStorage[this.name] = JSON.stringify(cart);
        }
    };

    cart.prototype.initCartValue = function (){
        // this.cart.currency = currency;
        this.cart.itemList = [];
        this.cart.orderValue = 0;
        this.isEmpty = false;
        this.saveCart();
    };

    cart.prototype.addItem = function (item){
        var already_exists = false;
        for(var i=0; i<this.cart.itemList.length; i++){
            if(item.product_id == this.cart.itemList[i].product_id){
                this.cart.itemList[i].quantity += 1;
                // this.cart.itemList[i].quantity = this.cart.itemList[i].option.quantity + item.option.quantity;
                // this.cart.itemList[i].status = item.status || -1;
                if(this.cart.itemList[i].quantity <= 0){
                    this.removeItem(this.cart.itemList[i].product_id);
                }
                already_exists = true;
                break;
            }
        }
        if(!already_exists){
            item.quantity = 1;
            this.cart.itemList.push(item);
        }
        this.isEmpty = false;
        this.saveCart();
    };

    cart.prototype.removeItem = function (product_id){
        for(var i=0; i<this.cart.itemList.length; i++){
            if(product_id == this.cart.itemList[i].product_id){
                this.cart.itemList.splice(i,1);
                break;
            }
        }
        if(this.cart.itemList.length>0){
          this.isEmpty = false;
        }else{
          this.isEmpty = true;
        }
        this.saveCart();
    };

    cart.prototype.changeItemQty = function (item){
        for(var i=0; i<this.cart.itemList.length; i++){
            if(item.product_id == this.cart.itemList[i].product_id){
                this.cart.itemList[i].quantity = item.quantity
                break;
            }
        }
        this.isEmpty = false;
        this.saveCart();
    };

    cart.prototype.reloadCart = function () {
        this.loadCart();
    };

    cart.prototype.resetCart = function () {
        this.cart.itemList = [];
        this.cart.orderValue = 0;
        this.isEmpty = false;
        this.saveCart();
    };

    cart.prototype.clearCart = function () {
        this.cart = {};
        this.isEmpty = true;
        this.saveCart();
    };

})(angular);
