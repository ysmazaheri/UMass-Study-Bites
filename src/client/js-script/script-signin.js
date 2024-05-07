const coverButton = document.getElementById('sign-in-sign-up-cover-button');
const coverBox = document.getElementById('sign-in-sign-up-cover');
const coverText = document.getElementById('sign-in-sign-up-cover-text');
const coverTitle = document.getElementById('sign-in-sign-up-cover-title');
const coverDesc = document.getElementById('sign-in-sign-up-cover-desc');

const formButton = document.getElementById('sign-in-sign-up-form-button');
const formBox = document.getElementById('sign-in-sign-up-form');
const formTitle = document.getElementById('sign-in-sign-up-form-title');

const confirmPassInput = document.getElementById('confirm-pass');

const titles = ["Sign In", "Sign Up"];
const coverTitles = ["New here?",
                    "Sign In"];
const coverDescs = ["Sign up for fast, safe, and efficient delivery services. Open to all UMass students and faculty.",
                    "Sign in to start ordering today!"];
const coverButtonValues = ["Sign Up",
                            "Sign In"]

// For getting info from forms, idxCount 0 = Sign in info, idxCount = 1 Sign up info
let idxCount = 0;

function slide () {
    idxCount = (idxCount + 1) % 2;
    // Transition to fade cover text
    coverText.classList.toggle('fadeTextAndButton');
    coverButton.classList.toggle('fadeTextAndButton');
    // Sliding transitions
    setTimeout(() => {
        // Transition to slide cover over
        coverBox.classList.toggle('slideCover');
        // Transitino to slide form over
        formBox.classList.toggle('slideForm');
    }, 300);
    // Changing form during slide
    setTimeout(() => { 
        // Changin form text
        formTitle.innerHTML = titles[idxCount];
        // Adding confirm password input field
        if (idxCount) confirmPassInput.removeAttribute("hidden");
        else confirmPassInput.setAttribute("hidden", "");
    }, 500);
    // Fade in new text
    setTimeout(() => {
        coverTitle.innerHTML = coverTitles[idxCount];
        coverDesc.innerHTML = coverDescs[idxCount];
        coverButton.value = coverButtonValues[idxCount];
        // Fade in new button and text
        coverText.classList.toggle('fadeTextAndButton');
        coverButton.classList.toggle('fadeTextAndButton');
    }, 800);
}

coverButton.addEventListener("click", () => slide());

// User sign in check
const tokenBox = document.getElementsByClassName('token-container')[0];
tokenBox.style.display = 'none';

const ls = window.localStorage;

// TODO: Implement
function checkSignedIn() {

    

}