var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;

module.exports = {
    inventory: data.inventory,
    shoppingCart: data.shoppingCart,
    addItem: function(itemId, quant){

       for (var i = 0; i < inventory.length; i++) {
         if (inventory[i].id === parseInt(itemId)) {
           if (inventory[i].quantityAvailable < quant) {
             shoppingCart[i].quantity += inventory[i].quantityAvailable;
             inventory[i].quantityAvailable = 0;
           } else {
             inventory[i].quantityAvailable -= quant;
             shoppingCart[i].quantity += quant;
           }
         }
       }
    },

    removeItem: function(itemId, quant){

      for (var i = 0; i < inventory.length; i++) {
        if (shoppingCart[i].itemId === itemId) {
          if (shoppingCart[i].quantity >= quant) {
            inventory[i].quantityAvailable += quant;
            shoppingCart[i].quantity -= quant;
          } else {
            inventory[i].quantityAvailable += shoppingCart[i].quantity;
            shoppingCart[i].quantity = 0;
          }
        }
      }
    },

    getCheckoutSubtotal: function(){
        var checkoutSubtotal = 0.00;
        for (var i = 0; i < inventory.length; i++) {
          if (inventory[i].id === shoppingCart[i].itemId) {
            checkoutSubtotal +=  shoppingCart[i].quantity * inventory[i].price;
          }
        }
        return checkoutSubtotal;
    },

    getTax: function(subtotal, rate){
        var tax = 0.00;
        tax += subtotal * rate;
        return tax;
    },

    getCheckoutTotal: function(){
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;

        checkoutTotal = (this.getCheckoutSubtotal() + this.getTax(this.getCheckoutSubtotal(), TAX_RATE)).toFixed(2);

        return checkoutTotal;
    }
}
