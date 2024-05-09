// Hardcoded back button
const backButton = document.getElementById('back-to-home');
backButton.addEventListener("click", () => {
    // Change window to index.html
    window.location.href = "index.html";
});



const URL = "http://localhost:3000";

try{
    let allOrdersResp = await fetch(`${URL}/order-all`, {
      method: "GET",
    });
    let allMenus = await allOrdersResp.json();
    console.log(allMenus);
}catch(err){
    console.log(err);
}

