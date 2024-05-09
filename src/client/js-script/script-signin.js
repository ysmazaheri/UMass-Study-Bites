import User from "../js-models/user.js";


/**
 * DOM elements for cover section
 */
const coverButton = document.getElementById('sign-in-sign-up-cover-button');
const coverBox = document.getElementById('sign-in-sign-up-cover');
const coverText = document.getElementById('sign-in-sign-up-cover-text');
const coverTitle = document.getElementById('sign-in-sign-up-cover-title');
const coverDesc = document.getElementById('sign-in-sign-up-cover-desc');

/**
 * DOM elements for form section
 */
const formButton = document.getElementById('sign-in-sign-up-form-button');
const formBox = document.getElementById('sign-in-sign-up-form');
// const formLogin = document.getElementById('sign-in-sign-up-form-fillout-login');
const formRegister = document.getElementById('sign-in-sign-up-form-fillout-register');
const formTitle = document.getElementById('sign-in-sign-up-form-title');
const confirmPassInput = document.getElementById('confirm-pass');

/**
 * Text content for cover section
 */
const titles = ["Sign In", "Sign Up"];
const coverTitles = ["New here?",
                    "Sign In"];
const coverDescs = ["Sign up for fast, safe, and efficient delivery services. Open to all UMass students and faculty.",
                    "Sign in to start ordering today!"];
const coverButtonValues = ["Sign Up",
                            "Sign In"];
const formType = ["none", "block"];

// formLogin.style.display = formType[0];
formRegister.style.display = formType[1];

/**
 * Index count for switching between sign in and sign up
 */
let idxCount = 0;

/**
 * Slide the cover and form sections to switch between sign in and sign up
 */
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
        formButton.innerHTML = coverButtonValues[(idxCount + 1) % 2];
        formRegister.style.display = formType[idxCount];
        // formLogin.style.display = formType[(idxCount + 1) % 2];

        // Adding confirm password input field
        if (idxCount) confirmPassInput.removeAttribute("hidden");
        else confirmPassInput.setAttribute("hidden", "");
    }, 500);
    // Fade in new text
    setTimeout(() => {
        coverTitle.innerHTML = coverTitles[idxCount];
        coverDesc.innerHTML = coverDescs[idxCount];
        coverButton.innerHTML = coverButtonValues[idxCount];
        // Fade in new button and text
        coverText.classList.toggle('fadeTextAndButton');
        coverButton.classList.toggle('fadeTextAndButton');
    }, 800);
}

coverButton.addEventListener("click", () => slide());

const ls = window.localStorage;

/**
 * Handle form submission for sign in or sign up
 */
formButton.addEventListener("click", async () => {
    if (idxCount === 1) {
        // Sign up
        try {
            const pass = document.getElementById('pass').value;
            const user = document.getElementById('user').value;
            const confpass = document.getElementById('confirm-pass').value;

            if (pass !== confpass) {
                alert("Passwords must match.");
            }

            const userNew = new User(user, pass);
            //fetch user route from server.js. routes are not done.
            localStorage.setItem('currentUser', JSON.stringify(userNew));
            alert("Sign up successful.");
        } catch (e) {
            handleError(e);
        }

        document.getElementById('pass').value = '';
        document.getElementById('user').value = '';
        document.getElementById('confirm-pass').value = '';
    } else {
        // Sign in
        try {
            const pass = document.getElementById('pass');
            const user = document.getElementById('user');
            const loadedUser = await loadUser(user); 
          
            if (loadedUser.password !== pass || loadedUser === undefined) {
                alert("Incorrect Username or Password");
                return;
            }
            
            localStorage.setItem('currentUser', JSON.stringify(loadedUser));
            tokenBox.style.display = 'display';
            alert("Sign in successful.");
        } catch (e) {
            handleError(e);
        }

        document.getElementById('pass').value = '';
        document.getElementById('user').value = '';
    }
})

/**
 * Handle errors during sign in or sign up
 * @param {Error} error - The error object
 */
function handleError(error) {
    console.error(error);
    alert("Incorrect Sign-in Attempt. Please try again.");
}

