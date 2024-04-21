/* JS that applies to all pages */

let toggleButton = document.getElementById("sidebar-toggle");
toggleButton.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    let sidebar = document.getElementsByClassName("sidebar").item(0);
    let topbar = document.getElementsByClassName("topbar").item(0);
    let main = document.getElementsByClassName("main").item(0);
    
    // Hide sidebar
    if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        main.style.width = "100vw";
        topbar.style.minWidth = "835px"
    }
    // Show sidebar
    else {
        sidebar.style.width = "165px";
        sidebar.style.display = "block";
        main.style.width = "calc(100vw - 165px)";
        topbar.style.minWidth = "1000px"
    }
}