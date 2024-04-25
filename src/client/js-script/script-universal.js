/* JS that applies to all pages */

import { createMenu, loadAllMenus } from "../js-databases/db-menu.js";
import { createOrder, loadAllOrders } from "../js-databases/db-order.js";
import Menu from "../js-models/menu.js";
import Order from "../js-models/order.js";

//await addMenusToPouch(); //Un-comment this line to force populate local PouchDB with the above menus **DO NOT LEAVE UNCOMMENTED**
//await addOrdersToPouch(); //Un-comment this line to force populate the local PouchDB with the above orders

//fills pouch with local menus and orders if local instance is empty
await fillPouchIfEmpty();

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
    "Entrees": [{
        name: "Apple Fritters",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Canadian Bacon",
        tags: ["E carbon rating"]
    },
    {
        name: "Hot Oatmeal",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
    "Pastries": [{
        name: "Muffins",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    },
    {
        name: "Mini Cheese Danish",
        tags: ["E carbon rating"]
    }],
    "Gluten Free": [{
        name: "Gluten Free Waffles",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Scrambled Eggs",
        tags: ["E carbon rating"]
    },
    {
        name: "Sour Cream & Green Onion Potato Casserole",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
};
let frankLunchMenu = {
    "Entrees": [{
        name: "Siracha Honey Glazed Chicken Leg",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
};

let frankDinnerMenu = {
    "Entrees": [{
        name: "Chicken Cattiatore",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Norwegian Salmon Schwarma",
        tags: []
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
};

let wooBreakfastMenu = {
    "Entrees": [{
        name: "French Toast Sticks",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Canadian Bacon",
        tags: ["E carbon rating"]
    },
    {
        name: "Hot Oatmeal",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
    "Pastries": [
    {
        name: "Mini Cheese Danish",
        tags: ["E carbon rating"]
    }],
    "Gluten Free": [{
        name: "Gluten Free Waffles",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Scrambled Eggs",
        tags: ["E carbon rating"]
    }],
};
let wooLunchMenu = {
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
    "Street Food": [{
        name: "Korean BBQ Chicken",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
};

let wooDinnerMenu = {
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
    "Sushi": [{
        name: "Teriyaki Chicken Roll",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
};

let hampBreakfastMenu = {
    "Entrees": [{
        name: "Apple Fritters",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Canadian Bacon",
        tags: ["E carbon rating"]
    },
    {
        name: "Hot Oatmeal",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
    "Pastries": [{
        name: "Muffins",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    },
    {
        name: "Mini Cheese Danish",
        tags: ["E carbon rating"]
    }],
    "Gluten Free": [{
        name: "Gluten Free Waffles",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Scrambled Eggs",
        tags: ["E carbon rating"]
    },
    {
        name: "Sour Cream & Green Onion Potato Casserole",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
};
let hampLunchMenu = {
    "Entrees": [{
        name: "Hampshire Honey Glazed Chicken Leg",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
};

let hampDinnerMenu = {
    "Entrees": [{
        name: "Chicken Cattiatore",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Norwegian Salmon Schwarma",
        tags: []
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
};

let berkBreakfastMenu = {
    "Entrees": [{
        name: "French Toast Sticks",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Canadian Bacon",
        tags: ["E carbon rating"]
    },
    {
        name: "Hot Oatmeal",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    }],
    "Pastries": [
    {
        name: "Mini Cheese Danish",
        tags: ["E carbon rating"]
    }],
    "Gluten Free": [{
        name: "Gluten Free Waffles",
        tags: ["Vegetarian","Sustainable","A carbon rating"]
    },
    {
        name: "Scrambled Eggs",
        tags: ["E carbon rating"]
    }],
};
let berkLunchMenu = {
    "Grill": [{
        name: "Halal Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
    "Street Food": [{
        name: "Korean BBQ Chicken",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
};

let berkDinnerMenu = {
    "Grill": [{
        name: "Berkshire Burger Patty",
        tags: ["Halal","Sustainable","A carbon rating"]
    },
    {
        name: "French Fries",
        tags: ["C carbon rating"]
    },
    {
        name: "Grilled Chicken Breast",
        tags: ["Sustainable","A carbon rating"]
    }],
    "Sushi": [{
        name: "Teriyaki Chicken Roll",
        tags: ["Sustainable","B carbon rating"]
    }],
    "Soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
};

let order1 = new Order('Ian McGregor', 'Franklin Dining Commons', 'JQA Hall', {});
order1.setTime('12:00 AM');
//don't worry guys, I know your last names, they're just not needed for this
let order2 = new Order('Said', 'Worcester Dining Commons', 'Wheeler Hall', {});
order2.setTime('9:00 AM');
let order3 = new Order('Vrishabh', 'Franklin Dining Commons', 'IDK Hall', {});
order3.setTime('12:00 PM');
let order4 = new Order('Drew', 'Berkshire Dining Commons', 'W.E.B. Du Bois Library', {});
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