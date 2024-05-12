/* JS that applies to all pages */
import Menu from "../js-models/menu.js";
import Order from "../js-models/order.js";


/**
 * Check to see if user is logged in
 */

const signupSidebar = document.getElementById('sign-in-sign-up-sidebar');
const logoutSidebar = document.getElementById('logout-sidebar');
const tokenContainer = document.getElementsByClassName('token-container')[0];
const tokenBalance = document.getElementsByClassName('token-balance')[0];

function checkedLoggedIn() {

    if (window.localStorage.getItem('user')) {

        let userParsed = JSON.parse(window.localStorage.getItem('user'));

        signupSidebar.style.display = 'none';
        logoutSidebar.style.display = 'block';
        tokenContainer.style.display = 'block';
        tokenBalance.innerHTML = userParsed.tokenCount;

    }
    else {

        signupSidebar.style.display = 'block';
        logoutSidebar.style.display = 'none';
        tokenContainer.style.display = 'none';

    }

}

checkedLoggedIn();



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


/**
 * Delivery Dashboard Page. If user is deliverer they will have access to the page.
 */

//class User is for testing purposes only.
/*class User {
    constructor(deliverer) {
        this.deliverer = deliverer;
    }
}
let user = new User();
user.deliverer = true;*/

let user = localStorage.getItem('user');

if (user !== null) {
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
}

