// Hardcoded back button
const backButton = document.getElementById('back-to-home');
backButton.addEventListener("click", () => {
    // Change window to index.html
    window.location.href = "index.html";
})