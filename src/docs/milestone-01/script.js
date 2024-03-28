let imgArr = ["./assets/Delivery_Selection.png", "./assets/Dining_Selection.png", "./assets/Order_Selection.png", "./assets/Order_View.png", "./assets/Report_Issue.png", "./assets/Sign_In_Up.png"];
let descArr = ["Select Delivery Location", "Select Dining Hall To Order From", "View the Dining Hall Menu", "View Orders Available To Deliver", "Report an Issue", "Sign In or Sign Up"];

let curImg = 0;

function changeImg() {

    curImg = (curImg + 1) % imgArr.length;
     
    let imgSrc = document.getElementById("wire-frame-img");
    imgSrc.src = imgArr[curImg];

    let desc = document.getElementById("wire-frame-desc");
    desc.innerHTML = descArr[curImg];

    console.log("hi");

}

let nextButton = document.getElementById("next");

nextButton.addEventListener("click", changeImg);