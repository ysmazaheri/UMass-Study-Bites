/* JS that applies to all pages */
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
