const coverButton = document.getElementById('sign-in-sign-up-cover-button');
const formButton = document.getElementById('sign-in-sign-up-form-button');
const coverBox = document.getElementById('sign-in-sign-up-cover');
const formBox = document.getElementById('sign-in-sign-up-form');
const formTitle = document.getElementById('sign-in-sign-up-form-title');
const confirmPassInput = document.getElementById('confirm-pass');

const titles = ["Sign In", "Sign Up"];
const visibility = ["none", "block"];
let idxCount = 0;

function slide () {

    idxCount = (idxCount + 1) % 2;

    coverBox.classList.toggle('slideCover');
    formBox.classList.toggle('slideForm');
    setTimeout(() => { 
        formTitle.innerHTML = titles[idxCount];
        confirmPassInput.style.visibility = visibility[idxCount];
    }, 300);

}

coverButton.addEventListener("click", () => slide());