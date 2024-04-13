/* JS that applies to all pages */

let toggleButton = document.getElementById("sidebar-toggle");
toggleButton.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    let sidebar = document.getElementsByClassName("sidebar").item(0);
    let main = document.getElementsByClassName("main").item(0);
    // Hide sidebar
    if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.display = "none";
        main.style.marginLeft = "0px";
    }
    // Show sidebar
    else {
        console.log("show!");
        sidebar.style.width = "150px";
        sidebar.style.display = "inline";
        main.style.marginLeft = "150px";
    }
}