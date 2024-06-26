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
const formLogin = document.getElementById('sign-in-sign-up-form-fillout-login');
const formRegister = document.getElementById('sign-in-sign-up-form-fillout-register');
const formTitle = document.getElementById('sign-in-sign-up-form-title');
const confirmPassInput = document.getElementById('confirm-pass');

/**
 * DOM elements for input fields
 */

const password = document.getElementById('password');
const username = document.getElementById('username');
const confpass = document.getElementById('confirm-pass');
const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');

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
const formType = ["none", "flex"];

formLogin.style.display = formType[1];
formRegister.style.display = formType[0];

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
        formLogin.style.display = formType[(idxCount + 1) % 2];

        // Clearing the form

        password.value = '';
        username.value = '';
        confpass.value = '';
        usernameLogin.value = '';
        passwordLogin.value = '';

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

const URL = "http://localhost:3000";
const ls = window.localStorage;

/**
 * Handle form submission for sign in or sign up
 */
formButton.addEventListener("click", async () => {
    if (idxCount === 1) {
        // Sign up

        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const confpass = document.getElementById('confirm-pass').value;

        // Check if password matches confirm password

        if (password !== confpass) {
            alert("Passwords must match.");
            return;
        }

        // Try to register user
    
        try {

            // Create the new user and stringify it to pass it through the fetch call for register

            const userNew = new User(username, password);
            const userNewJSON = JSON.stringify(userNew);

            // Send a request to check if username exists

            let userCheckResponse = await fetch(`${URL}/check-user?username=${username}`, {
                method: "GET"
            });

            // Alerts if username exists if user check response returns a success (if loadUser worked on the given username)

            if (userCheckResponse.status === 200) alert("Username already exists");
            else {

                // Sends a request to register a user

                let registerResponse = await fetch(`${URL}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: userNewJSON
                });

                // Alerts if user has been successfully registered

                if (registerResponse.status === 200) alert('Successfully created user');

            }

            // Clear form

            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirm-pass').value = '';

        } catch (err) {
            
            alert('Error trying to register your account');
            return;

        }

    } 
    else {
        // Sign in

        const password = document.getElementById('password-login').value;
        const username = document.getElementById('username-login').value;

        try {

            // Send a request to check if username exists

            let userCheckResponse = await fetch(`${URL}/check-user?username=${username}`, {
                method: "GET"
            });

            // If username exists, attempt to log user in

            if (userCheckResponse.status === 200) { 

                let requestBody = { username: username, password: password };
                let requestBodyJSON = JSON.stringify(requestBody);
                
                // Sends request to login user

                let loginResponse = await fetch(`${URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: requestBodyJSON
                });

                // // Catches data returned by the authenticate function in server.js

                let data = await loginResponse.json();

                // Checks whether password of user and given password match and alert a successful login

                if (data.match) {

                    alert('Successfully logged in');
                    window.location.href = "index.html";
                    window.localStorage.setItem('user', JSON.stringify(data.user));

                }
            }
            else {

                // Alerts if the username or password does not match the records

                alert('Username or password is incorrect');

            }
        
        } catch (err) {

            alert('Error trying to log user in');

        }
    }
});