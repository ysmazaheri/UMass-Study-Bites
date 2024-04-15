const toggleOptions = ["blocl", "none"];

let toggleCount = 0;

function toggle() {

    toggleCount = (toggleCount + 1) % 2;

    document.getElementById("sidebar").style.display = toggleOptions[toggleCount];

}

const icon = document.getElementById("sidebar-toggle");

icon.addEventListener("click", toggle);