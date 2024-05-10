// Logs user out and redirects to home page after some time

function logoutUser() {

    window.localStorage.removeItem('user');
    window.location.href = "index.html";

}

setTimeout(() => logoutUser(), 5000);

// Hardcoded back button
const backButton = document.getElementById('back-to-home');
backButton.addEventListener("click", () => {
    // Change window to index.html
    window.location.href = "index.html";
    window.localStorage.removeItem('user');
});