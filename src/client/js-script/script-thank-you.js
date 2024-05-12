// Hardcoded back button
const backButton = document.getElementById('back-to-home');
backButton.addEventListener("click", () => {
    // Change window to index.html
    window.location.href = "index.html";

    if (window.localStorage.getItem('OIList')) window.localStorage.removeItem('OIList');

});



const URL = "http://localhost:3000";

try{
    let allOrdersResp = await fetch(`${URL}/order-all`, {
      method: "GET",
    });
    let allOrders = await allOrdersResp.json();
    console.log(allOrders);
}catch(err){
    console.log(err);
}

