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

//pushes new pizza to Order pizzas array.
Order.prototype.addPizza = function(pizza) {
  this.incrementId(pizza);
  this.pizzas.push(pizza);
}

//increments Order's currentId by 1 and adds the current id to the Pizza object passed in.
Order.prototype.incrementId = function(pizza) {
  this.currentId++;
  pizza.id = this.currentId;
}

// //finds a pizza within the Order.pizzas array by a given id.
// Order.prototype.findPizza = function(id) {
  // for(let i = 0; i < this.pizzas.length; i++) {
  //   if(this.pizzas[i]) {
//       if(this.pizzas[i].id === id) {
//         return this.pizzas[i];
//       }
//     }
//   }
//   return false;
// }

//deletes a pizza within the Order.pizzas array by a given id.
Order.prototype.deletePizza = function(id) {
  var id = parseInt(id);
  for(let i = 0; i < this.pizzas.length; i++) {
    if(this.pizzas[i]) {
      if(this.pizzas[i].id === id) {
        delete this.pizzas[i];
        removePizzaDiv(id);
        return true;
      }
    }
  }
  return false;
}

/////////////////////////////////////////////
// PIZZA OBJECT //
//////////////////
function Pizza(toppingArr, size, price) {
  this.toppings = toppingArr;
  this.size = size;
  this.price = price;
}

/////////////////////////////////////////////
// Loner functions //
/////////////////////
function calculatePrice(toppingArr, size) {
  var price = 0;
  switch(size) {
    case "Mercury":
      price += 8;
      break;
    case "Earth":
      price += 12;
      break;
    case "Mars":
      price += 15;
      break;
  }
  price += (toppingArr.length - 1) * 2;
  return price;
}

//===========================================
//FRONT-END
//-------------------------------------------

//Order object

//Pizza object
Pizza.prototype.writePizza = function() {
  var sizeImage;
  switch(this.size) {
    case "Mercury":
      sizeImage = "img/mercury.jpg";
      break;
    case "Earth":
      sizeImage = "img/earth.jpg";
      break;
    case "Mars":
      sizeImage = "img/mars.jpg";
      break;
  }
  var toppingString = "";
  for(let i = 0; i < this.toppings.length; i++) {
    if(i === this.toppings.length - 1) {
      toppingString += this.toppings[i];
    } else {
      toppingString += (this.toppings[i] + ", ");
    }
  }
  var htmlString = `<div class="pizza" id=${this.id}><img src=${sizeImage} alt="Picture of pizza"><div class="pizzaInfo"><h5 id="topping">${toppingString}</h5><hr><p>Size: <span id="size">${this.size}</span></p><p>Cost: $<span id="cost">${this.price}</span></p></div><div class="buttons"><button id=${this.id} class="btn btn-danger btn-sm deleteButton">X</button><button id=${this.id} class="btn btn-warning btn-block editButton">EDIT</button></div></div>`;
  $("div#pizzas").prepend(htmlString);
}
//////////////////////////
// standalone functions //
//////////////////////////
function removePizzaDiv(id) {
  $("div.pizza#" + id).remove();
}


//On page load
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
      var pizza = new Pizza(toppingArr, size, calculatePrice(toppingArr, size));
      order.addPizza(pizza);
      //append pizza object to div#pizzas
      pizza.writePizza();
      $("#purchaseButton").show();
    } else {
      alert("Please select a pizza size!");
    }
  });
  //click listener on delete buttons
  $("div#pizzas").on("click", ".deleteButton", function() {
    order.deletePizza(this.id);
  })
  //click listener on 'purchase order' button
  $("#purchaseButton").click(function() {
    $("#orderForm, #pizzas, #purchaseButton").hide();
    $("#receipt").show();
  })
  $("#buyMoreButton").click(function() {
    $("#receipt").hide();
    order.pizzas.forEach(function(pizza) {

      order.deletePizza(pizza.id);
    })
    $("#orderForm, #pizzas").show();
  })
})