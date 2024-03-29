let imgArr = ["./assets/wireframes/Delivery_Selection.png", "./assets/wireframes/Dining_Selection.png", "./assets/wireframes/Order_Selection.png", "./assets/wireframes/Order_View.png", "./assets/wireframes/Report_Issue.png", "./assets/wireframes/Sign_In_Up.png"];
let descArr = ["Select Delivery Location", "Select Dining Hall To Order From", "View the Dining Hall Menu", "View Orders Available To Deliver", "Report an Issue", "Sign In or Sign Up"];

let curImg = 0;

function changeImg() {

    curImg = (curImg + 1) % imgArr.length;
     
    let imgSrc = document.getElementById("wire-frame-img");
    imgSrc.src = imgArr[curImg];

    let desc = document.getElementById("wire-frame-desc");
    desc.innerHTML = descArr[curImg];

}

let nextButton = document.getElementById("next");

nextButton.addEventListener("click", changeImg);