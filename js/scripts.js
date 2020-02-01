//===========================================
//BACK-END
//-------------------------------------------

///////////////////////////////////////////////
// ORDER OBJECT //
//////////////////
function Order() {
  this.pizzas = [];
  this.currentId = 0;
  this.totalCost = 0;
}

//pushes new pizza to Order pizzas array.
Order.prototype.addPizza = function(pizza) {
  this.incrementId(pizza);
  this.pizzas.push(pizza);
  this.totalCost += pizza.price;
}

//increments Order's currentId by 1 and adds the current id to the Pizza object passed in.
Order.prototype.incrementId = function(pizza) {
  this.currentId++;
  pizza.id = this.currentId;
}

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
function Pizza(toppingArr, size) {
  this.toppings = toppingArr;
  this.size = size;
  this.price = 0;
}

Pizza.prototype.calculatePrice = function() {
  switch(this.size) {
    case "Mercury":
      this.price += 8;
      break;
    case "Earth":
      this.price += 12;
      break;
    case "Mars":
      this.price += 15;
      break;
  }
  this.price += (this.toppings.length - 1) * 2;
}

//===========================================
//FRONT-END
//-------------------------------------------

//Order object
Order.prototype.displayOrderDetails = function() {
  $("#pizzaNum").html(this.pizzas.length);
  $("#totalCost").html(this.totalCost);
}
//Pizza object
Pizza.prototype.writePizza = function() {
  var toppingString = "";
  for(let i = 0; i < this.toppings.length; i++) {
    if(i === this.toppings.length - 1) {
      toppingString += this.toppings[i];
    } else {
      toppingString += (this.toppings[i] + ", ");
    }
  }
  if($("#moonSun").attr("src") === "img/moon.png") {
    var htmlString = `<div class="pizza" id=${this.id}><div class="pizzaImgDiv"><img id=${this.size} src=img/pizza.png alt="Picture of pizza"></div><div class="pizzaInfo"><h5 id="topping">${toppingString}</h5><hr><p>Size: <span id="size">${this.size}</span></p><p>Cost: $<span id="cost">${this.price}</span></p></div><div class="buttons"><button id=${this.id} class="btn btn-danger btn-sm deleteButton">X</button><button id=${this.id} class="btn btn-warning btn-block editButton">EDIT</button></div></div>`;
  } else {
    var htmlString = `<div class="pizza dark" id=${this.id}><div class="pizzaImgDiv"><img id=${this.size} src=img/pizza.png alt="Picture of pizza"></div><div class="pizzaInfo"><h5 id="topping">${toppingString}</h5><hr><p>Size: <span id="size">${this.size}</span></p><p>Cost: $<span id="cost">${this.price}</span></p></div><div class="buttons"><button id=${this.id} class="btn btn-danger btn-sm deleteButton">X</button><button id=${this.id} class="btn btn-warning btn-block editButton">EDIT</button></div></div>`;
  }
  
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
      var pizza = new Pizza(toppingArr, size);
      pizza.calculatePrice();
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
    order.displayOrderDetails();
    $("#receipt").show();
  })
  $("#buyMoreButton").click(function() {
    $("#receipt").hide();
    order.pizzas.forEach(function(pizza) {

      order.deletePizza(pizza.id);
    })
    order.currentId = 0;
    order.totalCost = 0;
    $("#orderForm, #pizzas").show();
    console.log(order);
  })
  //dark mode button click listener
  $("button#lightDark").click(function() {
    var buttonImage = $("#moonSun");
    if(buttonImage.attr("src") === "img/moon.png") {
      buttonImage.attr("src", "img/sun.png");
      $("#pizzas").each(function() {

      })
      $(".panel").addClass("dark");
      $(".pizza").addClass("dark");
      $(".receiptInfo").addClass("dark");
      $(".pizzaSize").addClass("darkSize");
      $("footer").addClass("dark");
    } else {
      buttonImage.attr("src", "img/moon.png");
      $(".panel").removeClass("dark");
      $(".pizza").removeClass("dark");
      $(".receiptInfo").removeClass("dark");
      $(".pizzaSize").removeClass("darkSize");
      $("footer").removeClass("dark");
    }
  })
})