function logoutUser() {

    window.localStorage.removeItem('user');
    window.location.href = "index.html";

}

setTimeout(() => logoutUser(), 5000);