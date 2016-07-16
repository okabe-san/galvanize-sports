var galvanizeSports = require("../galvanize_sports");
var assert = require("chai").assert;

function initializeData(){
    galvanizeSports.inventory[0].quantityAvailable = 3;
    galvanizeSports.inventory[1].quantityAvailable = 5;
    galvanizeSports.inventory[2].quantityAvailable = 7;
    galvanizeSports.shoppingCart[0].quantity = 2;
    galvanizeSports.shoppingCart[1].quantity = 2;
    galvanizeSports.shoppingCart[2].quantity = 2;
}

describe("Functions should work", function() {
  describe("#addItem", function () {
    it("adds an item to the shopping cart", function () {
      initializeData();
      galvanizeSports.addItem(10, 1);
      assert.equal(galvanizeSports.shoppingCart[0].quantity, 3, "Item 1 should be added to the shopping cart");
      galvanizeSports.addItem(15, 1);
      assert.equal(galvanizeSports.shoppingCart[1].quantity, 3, "Items 2 should be added to the shopping cart");
      galvanizeSports.addItem(18, 1);
      assert.equal(galvanizeSports.shoppingCart[2].quantity, 3, "Items 3 should be added to the shopping cart");
    });
    it("updates the inventory", function () {
      initializeData();
      galvanizeSports.addItem(10, 1);
      assert.equal(galvanizeSports.inventory[0].quantityAvailable, 2, "Item 1 should be removed from the available inventory");
      galvanizeSports.addItem(15, 1);
      assert.equal(galvanizeSports.inventory[1].quantityAvailable, 4, "Item 2 should be removed from the available inventory");
      galvanizeSports.addItem(18, 1);
      assert.equal(galvanizeSports.inventory[2].quantityAvailable, 6, "Item 3 should be removed from the available inventory");
    });
    it("when requested quantity is greater than available inventory, remaining inventory is added to cart", function () {
      initializeData();
      galvanizeSports.addItem(10, 50);
      assert.equal(galvanizeSports.shoppingCart[0].quantity, 5, "All available item 1's should be added to the shopping cart");
      assert.equal(galvanizeSports.inventory[0].quantityAvailable, 0, "All available item 1's should be removed from the available inventory");
    });
  });
  describe("#removeItem", function () {
    it('should remove items from the cart', function () {
      initializeData();
      galvanizeSports.removeItem(10, 1);
      assert.equal(galvanizeSports.shoppingCart[0].quantity, 1, "Item 1 should be removed from the shopping cart");
      assert.equal(galvanizeSports.inventory[0].quantityAvailable, 4, "Item 1 should be added to the available inventory");

      galvanizeSports.removeItem(15, 1);
      assert.equal(galvanizeSports.shoppingCart[1].quantity, 1, "Items 2 should be removed from the shopping cart");
      assert.equal(galvanizeSports.inventory[1].quantityAvailable, 6, "Item 2 should be added to the available inventory");

      galvanizeSports.removeItem(18, 1);
      assert.equal(galvanizeSports.shoppingCart[2].quantity, 1, "Items 3 should be removed from the shopping cart");
      assert.equal(galvanizeSports.inventory[2].quantityAvailable, 8, "Item 3 should be added to the available inventory");
    });
    it("number of items removed from cart does not exceed the quantity of items actually in the cart", function () {
      galvanizeSports.removeItem(10, 50);
      assert.equal(galvanizeSports.shoppingCart[0].quantity, 0, "All available item 1's should be removed from the shopping cart");
      assert.equal(galvanizeSports.inventory[0].quantityAvailable, 5, "All available item 1's should be added to the available inventory")
    })
  });
  describe("#getCheckoutSubtotal", function () {
    it("Calculates the subtotal", function(){
      initializeData();
      assert.equal(galvanizeSports.getCheckoutSubtotal(), 299.96, "Calculates correct subtotal");
    });
  });
  describe("#getTax", function () {
    it("should calculate tax", function(){
      initializeData();
      assert.equal(galvanizeSports.getTax(300, 0.078), 23.40, "Calculates correct tax");
    });
  });
  describe("#getCheckoutTotal", function () {
    it("should have a working getCheckoutTotal function", function(){
      initializeData();
      assert.equal(galvanizeSports.getCheckoutTotal(), 323.36, "Calculates correct total");
    });
  });
});

describe("User workflow should work", function() {
  it("should allow the user to add and remove some items, then display the correct total", function(){
      initializeData();
      galvanizeSports.addItem(10, 2);
      galvanizeSports.addItem(15, 2);
      galvanizeSports.addItem(18, 3);
      galvanizeSports.removeItem(15, 2);

      assert.equal(galvanizeSports.shoppingCart[0].quantity, 4, "Correct number of item 1s in shopping cart");
      assert.equal(galvanizeSports.shoppingCart[1].quantity, 2, "Correct number of item 2s in shopping cart");
      assert.equal(galvanizeSports.shoppingCart[2].quantity, 5, "Correct number of item 3s in shopping cart");
      assert.equal(galvanizeSports.inventory[0].quantityAvailable, 1, "Correct number of item 1s in inventory");
      assert.equal(galvanizeSports.inventory[1].quantityAvailable, 5, "Correct number of item 2s in inventory");
      assert.equal(galvanizeSports.inventory[2].quantityAvailable, 4, "Correct number of item 3s in inventory");
      assert.equal(galvanizeSports.getCheckoutTotal(), 625.14, "Calculates correct total");
  });
});
