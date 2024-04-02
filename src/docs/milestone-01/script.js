const imgArr = ["./assets/wireframes/Delivery_Selection.png", "./assets/wireframes/Order_Selection.png", "./assets/wireframes/Order_View.png", "./assets/wireframes/Sign_In_Up.png"];
const descTitleArr = ["Home Page / Select Delivery Location", "Menu Browse / Order Placement", "Delivery Menu", "Sign In / Sign Up"];
const descBodyArr = [

    "Our home page is designed to give students a cohesive overview of the application. Directly in the middle is a map of campus, which will have the user’s dorm and the available dining options marked. The user can click on any of the locations to begin ordering. On the right is the list of dining options, which users can also use to choose their desired location. The sidebar and overview of the app allow for easy navigation and an optional overview of the app.",
    "On this screen, we have a list of foods available at the selected dining location. Similar to the UMass Dining app, the foods are sorted by section in the dining hall. There is also a search bar at the top, which allows users to find what they are looking for quickly, rather than browse the list. Clicking on a food option will allow the user to add it to their order. Also on the top are tabs to view the rest of the day’s meals, so students can easily plan their meals.",
    "This screen is our delivery menu, which shows current orders waiting to be delivered by a student, in order of recency. This way, the students who have been waiting the longest for an order will be most likely to have their order picked up soon. A student can click on any option in this list and assign the delivery to themselves, as well as using the filters on top to find the deliveries that they are able to easily make.",
    "This is our sign-in screen, which requires a UMass email address, name, phone number, and password. Besides creating a distinct user account, these credentials also mandate that only UMass students can have accounts on the app."

]

let curImg = 0;

function changeImg() {

    curImg = (curImg + 1) % imgArr.length;
     
    let imgSrc = document.getElementById("wire-frame-img");
    imgSrc.src = imgArr[curImg];

    let descTitle = document.getElementById("wire-frame-desc-title");
    descTitle.innerHTML = (`<b>${descTitleArr[curImg]}</b>`);

    console.log(descTitle[curImg]);

    let descBody = document.getElementById("wire-frame-desc-body");
    descBody.innerHTML = descBodyArr[curImg];

}

let nextButton = document.getElementById("next");

nextButton.addEventListener("click", changeImg);