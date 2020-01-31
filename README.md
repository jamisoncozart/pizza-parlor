# _Out-of-This-World Pizza (OTS Za)_

#### _Pizza purchasing application for users to customize and order their favorite pizzas._, 31 January 2020

#### By _**Jamison Cozart**_

## Description

_This pizza purchasing application was made to practice working with creating and editting objects, and adding methods to object prototypes. The website was created to practice what an order form would look like, and provide the functionality to customize your order to your liking._

_The page can be viewed online on [Github Pages](https://jamisoncozart.github.io/pizza-parlor/)_

## Setup/Installation Requirements

1. Clone the repository into preferred directory:
    ```
    git clone https://github.com/jamisoncozart/pizza-parlor
    ```
2. Open working directory in Visual Studio Code or preferred text editor:
    ```
    code .
    ```
3. Open `index.html` in Chrome or preferred browser (some styles might change if not openned in chrome)

## Behavior Driven Development Specifications

behavior | Input | Output
:---------:|:----:|:------
User clicks "Add Za" button, create and show new pizza object | _clicks_ "Add Za" | "Pizza Created"
User chooses toppings and clicks "Add Za" button, create and show new pizza object with toppings | _checkmarks_ "Sausage" + "Onions" _clicks_ "Add Za" | "Pizza Created, Toppings: Sausage, Onions."
User chooses pizza size and clicks "Add Za" button, create and show new pizza object with size | _clicks_ "Earth" _clicks_ "Add Za" | "Pizza Created, Size: Earth."
User clicks "X" on any already created pizza, deletes pizza from order | _clicks_ "X" | "Pizza Deleted."
User clicks "EDIT" on any already created pizza, edit details of pizza | _clicks_ "EDIT" | _Show dropdowns of toppings and size choices, and a "Save" button_
User clicks "Save" on any editted pizza, save newly editted pizza and show it | _clicks_ "Save" | _Show updated information for pizza_
User clicks "Purchase" on pizza order, hide all pizzas, and show a receipt | _clicks_ "Purchase" | "You have purchased 'X' Pizzas for $'Y'" 
User clicks "Buy More!" on receipt page, hide receipt page and show pizza form | _clicks_ "Buy More!" | _show pizza order form_


## Technologies Used

* HTML
* CSS
* Bootstrap
* Javascript
* jQuery
* Git

### License

*This software is licensed under the MIT license*

Copyright (c) 2020 **_Jamison Cozart_**