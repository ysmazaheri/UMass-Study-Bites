/* JS that applies to all pages */
import Menu from "../js-models/menu.js";
import Order from "../js-models/order.js";

//addMenusToPouch(); //Un-comment this line to force populate local PouchDB with the above menus **DO NOT LEAVE UNCOMMENTED**
//addOrdersToPouch(); //Un-comment this line to force populate the local PouchDB with the above orders

//fills pouch with local menus and orders if local instance is empty
//fillPouchIfEmpty();

let toggleButton = document.getElementById("sidebar-toggle");
toggleButton.addEventListener("click", toggleSidebar);


// Implement sidebar toggle button for all pages
function toggleSidebar() {
    let sidebar = document.getElementsByClassName("sidebar").item(0);
    let topbar = document.getElementsByClassName("topbar").item(0);
    let main = document.getElementsByClassName("main").item(0);
    // If the sidebar is currently open, close it
    if (sidebar.style.width !== "0px") {
        // Close by changing width and visibility
        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        // Adjust main div width to compensate
        main.style.width = "100vw";
        topbar.style.minWidth = "835px";
        localStorage.setItem('sidebarState', 'hidden');
    }
    // if the sidebar is currently closed, open it
    else {
        // Close by changing width and visibility
        sidebar.style.width = "165px";
        sidebar.style.display = "block";
        // Adjust main div width to compensate
        main.style.width = "calc(100vw - 165px)";
        topbar.style.minWidth = "1000px";
        localStorage.setItem('sidebarState', 'visible'); 
    }
}

// check the initial state of the sidebar from LS
document.addEventListener("DOMContentLoaded", function() {
    const sidebarState = localStorage.getItem('sidebarState');
    // Make sidebar's close/open status be retained across webpages using local memory
    if (sidebarState === 'hidden') {
        let sidebar = document.getElementsByClassName("sidebar").item(0);
        let topbar = document.getElementsByClassName("topbar").item(0);
        let main = document.getElementsByClassName("main").item(0);
        // Minimize if it was minimized before
        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        main.style.width = "100vw";
        topbar.style.minWidth = "835px";
    }
});


//Put all other code above this point because it's super long

//Setup for placeholder data in PouchDB. 
/*
let order1 = new Order('Ian McGregor', 'Franklin Dining Commons', 'JQA Hall', {"Tomato Bisque": 2, "Teriyaki Chicken Roll": 1});
order1.setTime('12:00 AM');
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
}*/

/**
 * Delivery Button Shows up for deliverers
 */

//class User is for testing purposes only.
class User {
    constructor(deliverer) {
        this.deliverer = deliverer;
    }
}

const user = new User();
user.deliverer = true;

if (user.deliverer) {
    let deliveryDashboardLink = document.createElement("a");
    deliveryDashboardLink.href = "../order-deliverer.html";
    deliveryDashboardLink.className = "site-nav-bar-link";
    deliveryDashboardLink.textContent = "Delivery";
    deliveryDashboardLink.id = "deliverer-link";

    let siteNavBarLinks = document.querySelector(".site-nav-bar-links");
    let lastSiteNavBarLink = siteNavBarLinks.lastElementChild;
    siteNavBarLinks.insertBefore(deliveryDashboardLink, lastSiteNavBarLink.nextSibling);
}