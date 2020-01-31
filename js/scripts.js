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

Order.prototype.findPizza = function(id) {
  if(this.pizzas[id - 1]) {
    for(let i = 0; i < this.pizzas.length; i++) {
      if(pizzas[i].id === id) {
        return pizza[i];
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
  var htmlString = `<div class="pizza"><img src=${sizeImage} alt="Picture of pizza"><div class="pizzaInfo"><h5 id="topping">${toppingString}</h5><hr><p>Size: <span id="size">${this.size}</span></p><p>Cost: $<span id="cost">24</span></p></div><div class="buttons"><button id="deleteButton" class="btn btn-danger btn-sm">X</button><button id="editButton" class="btn btn-warning btn-block">EDIT</button></div></div>`;
  $("div#pizzas").prepend(htmlString);
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
      var pizza = new Pizza(toppingArr, size)
      order.addPizza(pizza);
      //append pizza object to div#pizzas
      pizza.writePizza();
    } else {
      alert("Please select a pizza size!");
    }
    
  });
})