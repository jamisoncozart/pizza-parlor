//===========================================
//BACK-END
//-------------------------------------------

///////////////////////////////////////////////
// ORDER OBJECT //
//////////////////
function Order() {
  this.pizzas = [];
  this.currentId = 0;
}

Order.prototype.addPizza = function(pizza) {
  this.incrementId(pizza);
  this.pizzas.push(pizza);
}

Order.prototype.incrementId = function(pizza) {
  this.currentId++;
  pizza.id = this.currentId;
}

/////////////////////////////////////////////
// PIZZA OBJECT //
//////////////////
function Pizza(toppingArr, size) {
  this.toppings = toppingArr;
  this.size = size;
}

//===========================================
//FRONT-END
//-------------------------------------------

$(document).ready(function() {
  var order = new Order();
  var size;
  //click listener on pizza size selection
  $("div#sizeSelect").on("click", ".pizzaSize", function() {
    size = this.id;
    $(".pizzaSize").removeClass("selected");
    $(this).addClass("selected");
  });
  //click listener on 'Add Za' button
  $("button#addZa").click(function() {
    if(size) {
      //create pizza object from form input
      var toppingArr = [];
      $("input:checkbox[name=toppings]:checked").each(function() {
        toppingArr.push($(this).val());
      })
      var pizza = new Pizza(toppingArr, size)
      order.addPizza(pizza);
      console.log(pizza);
      //append pizza object to div#pizzas
    } else {
      alert("Please select a pizza size!");
    }
    
  });
})