/* JS that applies to all pages */

import { createMenu, loadAllMenus } from "../js-databases/db-menu.js";
import { createOrder, loadAllOrders } from "../js-databases/db-order.js";
import Menu from "../js-models/menu.js";
import Order from "../js-models/order.js";

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
    "entrees": [{
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
    "pastries": [{
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
    "entrees": [{
        name: "Siracha Honey Glazed Chicken Leg",
        tags: ["Sustainable","B carbon rating"]
    }],
    "soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "grill": [{
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
    "entrees": [{
        name: "Chicken Cattiatore",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Norwegian Salmon Schwarma",
        tags: []
    }],
    "soups": [{
        name: "Chicken Noodle Soup",
        tags: ["Sustainable","B carbon rating"]
    },
    {
        name: "Tomato Bisque",
        tags: ["Vegetarian","Sustainable","B carbon rating"]
    }],
    "grill": [{
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

let order1 = new Order('Ian McGregor', 'Franklin Dining Commons', 'JQA Hall', {});
order1.setTime('12:00 AM');
//don't worry guys, I know your last names, they're just not needed for this
let order2 = new Order('Said', 'Worcester Dining Commons', 'Wheeler Hall', {});
order2.setTime('9:00 AM');
let order3 = new Order('Vishrabh', 'Franklin Dining Commons', 'IDK Hall', {});
order3.setTime('12:00 PM');
let order4 = new Order('Drew', 'Berkshire Dining Commons', 'W.E.B. Du Bois Library', {});
order4.setTime('12:00 AM');

//addMenusToPouch(); //Un-comment this line to populate local PouchDB with the above menus **DO NOT LEAVE UNCOMMENTED**
//addOrdersToPouch(); //Un-comment this line to populate the local PouchDB with the above orders

async function addMenusToPouch(){
    let frankBreak = new Menu("Franklin Dining Commons", "Breakfast", frankBreakfastMenu);
    let res = await createMenu(frankBreak);
    //console.log(res);
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

}

async function addOrdersToPouch(){
    await createOrder(order1);
    await createOrder(order2);
    await createOrder(order3);
    await createOrder(order4);
    console.log(loadAllOrders());
}