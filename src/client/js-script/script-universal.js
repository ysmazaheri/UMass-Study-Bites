/* JS that applies to all pages */

import { createMenu, loadAllMenus } from "../../server/js-databases/db-menu.js";
import { createOrder, loadAllOrders } from "../../server/js-databases/db-order.js";
import Menu from "../js-models/menu.js";
import Order from "../js-models/order.js";

//addMenusToPouch(); //Un-comment this line to force populate local PouchDB with the above menus **DO NOT LEAVE UNCOMMENTED**
//addOrdersToPouch(); //Un-comment this line to force populate the local PouchDB with the above orders

//fills pouch with local menus and orders if local instance is empty
fillPouchIfEmpty();

let toggleButton = document.getElementById("sidebar-toggle");
toggleButton.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    let sidebar = document.getElementsByClassName("sidebar").item(0);
    let topbar = document.getElementsByClassName("topbar").item(0);
    let main = document.getElementsByClassName("main").item(0);

    if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        main.style.width = "100vw";
        topbar.style.minWidth = "835px";
        localStorage.setItem('sidebarState', 'hidden');
    }
    else {
        sidebar.style.width = "165px";
        sidebar.style.display = "block";
        main.style.width = "calc(100vw - 165px)";
        topbar.style.minWidth = "1000px";
        localStorage.setItem('sidebarState', 'visible'); 
    }
}

// check the initial state of the sidebar from LS
document.addEventListener("DOMContentLoaded", function() {
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'hidden') {
        let sidebar = document.getElementsByClassName("sidebar").item(0);
        let topbar = document.getElementsByClassName("topbar").item(0);
        let main = document.getElementsByClassName("main").item(0);

        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        main.style.width = "100vw";
        topbar.style.minWidth = "835px";
    }
});


//Put all other code above this point because it's super long

//Setup for placeholder data in PouchDB. 

let frankBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Sausage Links", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]},
      {name: "Omelette Station", tags: []}
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Toast Bar": [
        {name: "White Bread", tags: ["vegetarian"]},
        {name: "Everything Bagel", tags: ["vegetarian"]},
        {name: "Rye Bread", tags: ["vegetarian"]},
        {name: "Peanut Butter", tags: ["vegetarian"]},
        {name: "Butter", tags: ["vegetarian"]},
        {name: "Cream Cheese", tags: ["vegetarian"]},
        {name: "Strawberry Jelly", tags: ["vegetarian"]},
      ]
};
  
let frankLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Beef Lasagna", tags: []},
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]}
    ],
    "Latino food": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Mango Salad", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]},
      {name: "Brownies", tags: ["vegetarian"]},
      {name: "Ice Cream", tags: ["vegetarian"]}
    ]
  };
  
  let frankDinnerMenu = {
    "Entrees": [
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Roast Pork", tags: []},
    ],
    "Express": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetable Lasagna", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Mango Salad", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Cheesecake", tags: ["vegetarian"]},
      {name: "Apple Pie", tags: ["vegetarian"]},
    ]
  };

  let wooBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "Pancakes with Maple Syrup", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]}
    ],
    "Cold Breakfast Items": [
      {name: "Greek Yogurt with Granola", tags: ["vegetarian"]},
      {name: "Assorted Cereal Bar with Milk", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Extras": [
      {name: "Toast Bar", tags: ["vegetarian"]},
    ]
  };
  
  let wooLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Stir-Fry", tags: ["vegetarian"]},
      {name: "Beef Lasagna", tags: []},
      {name: "Pasta with Marinara Sauce", tags: ["vegetarian"]},
    ],
    "Latino Food": [
      {name: "Spicy Mango Salad", tags: ["vegetarian"]},
      {name: "Beef Fajitas", tags: []},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]}
    ]
  };
  
  let wooDinnerMenu = {
    "Grill": [
      {name: "Burger", tags: []},
      {name: "French Fries", tags: ["vegetarian"]},
      {name: "Grilled Chicken", tags: []},
      {name: "Jerk Chicken", tags: []}
    ],
    "Salad Bar": [
      {name: "Mixed Green Salad", tags: ["vegetarian"]}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Brownies", tags: ["vegetarian"]}
    ]
  };

  let hampBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Sausage Links", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]},
    ],
    "Cold Breakfast Items": [
        {name: "Vanilla Yogurt", tags: ["vegetarian"]},
        {name: "Strawberry Yogurt", tags: ["vegetarian"]},
        {name: "Granola", tags: ["vegetarian"]},
        {name: "Strawberries", tags: ["vegetarian"]},
        {name: "Blackberries", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Toast Bar": [
      {name: "White Bread", tags: ["vegetarian"]},
      {name: "Everything Bagel", tags: ["vegetarian"]},
      {name: "Rye Bread", tags: ["vegetarian"]},
      {name: "Peanut Butter", tags: ["vegetarian"]},
      {name: "Butter", tags: ["vegetarian"]},
      {name: "Cream Cheese", tags: ["vegetarian"]},
      {name: "Strawberry Jelly", tags: ["vegetarian"]},
    ],
};
  
let hampLunchMenu = {
    "Entrees": [
      {name: "Hampshire Chicken Breast", tags: []},
      {name: "Beef Lasagna", tags: []},
      {name: "Fried Rice", tags: []},
      {name: "Grilled Salmon", tags: []},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]}
    ],
    "Latino food": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Baked Beans", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]},
      {name: "Brownies", tags: ["vegetarian"]},
      {name: "Ice Cream", tags: ["vegetarian"]}
    ]
  };
  
  let hampDinnerMenu = {
    "Entrees": [
      {name: "Grilled Salmon", tags: []},
      {name: "Roast Pork", tags: []},
    ],
    "Express": [
      {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
      {name: "Fried Rice", tags: []}
    ],
    "Vegetarian": [
      {name: "Vegetable Lasagna", tags: ["vegetarian"]},
      {name: "Stuffed Bell Peppers", tags: ["vegetarian"]},
      {name: "Baked Beans", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Cheesecake", tags: ["vegetarian"]},
      {name: "Apple Pie", tags: ["vegetarian"]},
    ]
  };

  let berkBreakfastMenu = {
    "Hot Breakfast Items": [
      {name: "Scrambled Eggs", tags: ["vegetarian"]},
      {name: "Bacon Strips", tags: []},
      {name: "Breakfast Potatoes", tags: ["vegetarian"]},
      {name: "Pancakes with Maple Syrup", tags: ["vegetarian"]},
      {name: "French Toast Sticks", tags: ["vegetarian"]}
    ],
    "Cold Breakfast Items": [
      {name: "Greek Yogurt with Granola", tags: ["vegetarian"]},
      {name: "Assorted Cereal Bar with Milk", tags: ["vegetarian"]},
    ],
    "Beverages": [
      {name: "Coffee", tags: ["sustainable"]},
      {name: "Tea", tags: ["sustainable"]},
      {name: "Orange Juice", tags: ["A carbon rating"]},
      {name: "Apple Juice", tags: ["A carbon rating"]},
      {name: "Milk", tags: ["sustainable"]},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Extras": [
      {name: "Toast Bar", tags: ["vegetarian"]},
    ]
  };
  
  let berkLunchMenu = {
    "Entrees": [
      {name: "Grilled Chicken Breast", tags: []},
      {name: "Stir-Fry", tags: ["vegetarian"]},
      {name: "Beef Lasagna", tags: []},
      {name: "Pasta with Marinara Sauce", tags: ["vegetarian"]},
    ],
    "Latino Food": [
      {name: "Spicy Mango Salad", tags: ["vegetarian"]},
      {name: "Beef Fajitas", tags: []},
    ],
    "Express": [
        {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
        {name: "Fried Rice", tags: []}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Chocolate Chip Cookies", tags: ["vegetarian"]}
    ]
  };
  
  let berkDinnerMenu = {
    "Grill": [
      {name: "Berkshire Burger", tags: []},
      {name: "French Fries", tags: ["vegetarian"]},
      {name: "Grilled Chicken", tags: []},
      {name: "Jerk Chicken", tags: []}
    ],
    "Express": [
        {name: "Vegetarian Stir-Fry", tags: ["vegetarian"]},
        {name: "Fried Rice", tags: []}
    ],
    "Salad Bar": [
      {name: "Mixed Green Salad", tags: ["vegetarian"]}
    ],
    "Beverages": [
      {name: "Iced Tea", tags: []},
      {name: "Lemonade", tags: []},
      {name: "Coca-Cola", tags: []},
      {name: "Water", tags: ["sustainable"]}
    ],
    "Desserts": [
      {name: "Brownies", tags: ["vegetarian"]}
    ]
  };

let order1 = new Order('Ian McGregor', 'Franklin Dining Commons', 'JQA Hall', {"Tomato Bisque": 2, "Teriyaki Chicken Roll": 1});
order1.setTime('12:00 AM');
//don't worry guys, I know your last names, they're just not needed for this
let order2 = new Order('Said', 'Worcester Dining Commons', 'Wheeler Hall', {"Grilled Chicken Breast": 1, "French Fries": 3, "Berkshire Burger Patty": 1});
order2.setTime('9:00 AM');
let order3 = new Order('Vrishabh', 'Franklin Dining Commons', 'IDK Hall', {"Chicken Noodle Soup": 5, "French Fries": 3});
order3.setTime('12:00 PM');
let order4 = new Order('Drew', 'Berkshire Dining Commons', 'W.E.B. Du Bois Library', {"Scrambled Eggs": 2, "Teriyaki Chicken Roll": 2});
order4.setTime('12:00 AM');

async function fillPouchIfEmpty(){
    let numMenus = (await loadAllMenus()).length;
    let numOrders = (await loadAllOrders()).length;
    if(numMenus === 0){
        addMenusToPouch();
    }
    if(numOrders === 0){
        addOrdersToPouch();
    }
}

async function addMenusToPouch(){
    let frankBreak = new Menu("Franklin Dining Commons", "Breakfast", frankBreakfastMenu);
    await createMenu(frankBreak);
    let frankLunch = new Menu("Franklin Dining Commons", "Lunch", frankLunchMenu);
    await createMenu(frankLunch);
    let frankDinner = new Menu("Franklin Dining Commons", "Dinner", frankDinnerMenu);
    await createMenu(frankDinner);

    let wooBreak = new Menu("Worcester Dining Commons", "Breakfast", wooBreakfastMenu);
    await createMenu(wooBreak);
    let wooLunch = new Menu("Worcester Dining Commons", "Lunch", wooLunchMenu);
    await createMenu(wooLunch);
    let wooDinner = new Menu("Worcester Dining Commons", "Dinner", wooDinnerMenu);
    await createMenu(wooDinner);

    let hampBreak = new Menu("Hampshire Dining Commons", "Breakfast", hampBreakfastMenu);
    await createMenu(hampBreak);
    let hampLunch = new Menu("Hampshire Dining Commons", "Lunch", hampLunchMenu);
    await createMenu(hampLunch);
    let hampDinner = new Menu("Hampshire Dining Commons", "Dinner", hampDinnerMenu);
    await createMenu(hampDinner);

    let berkBreak = new Menu("Berkshire Dining Commons", "Breakfast", berkBreakfastMenu);
    await createMenu(berkBreak);
    let berkLunch = new Menu("Berkshire Dining Commons", "Lunch", berkLunchMenu);
    await createMenu(berkLunch);
    let berkDinner = new Menu("Berkshire Dining Commons", "Dinner", berkDinnerMenu);
    await createMenu(berkDinner);

}

async function addOrdersToPouch(){
    await createOrder(order1);
    await createOrder(order2);
    await createOrder(order3);
    await createOrder(order4);
    console.log(loadAllOrders());
}