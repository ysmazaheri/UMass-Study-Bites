// Hardcoded back button
const backButton = document.getElementById('back-to-home');
backButton.addEventListener("click", () => {
    // Change window to home.html
    window.location.href = "home.html";
})