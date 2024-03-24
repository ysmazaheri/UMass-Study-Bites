let imgArr = ["./assets/coffee1", "./assets/coffee2", "./assets/coffee3"]
let descArr = ["Coffee 1", "Coffee 2", "Coffee 3"]

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

nextButton.addEventListener("click", () => changeImg);