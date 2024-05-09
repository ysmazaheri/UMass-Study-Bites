import { OrderCart } from "../js-models/OrderCart.js";
import { OrderStorage } from "../js-models/OrderStorage.js"
import Order from "../js-models/order.js"

const URL = "http://localhost:3000";

const orderStorage = new OrderStorage();
let diningHall = orderStorage.getSelections().pickUpLocation;
let residence = orderStorage.getSelections().dropOffLocation;
const orderCart = new OrderCart();

const orderListElement = document.getElementById('order-preview-list');
const pickupLocElement = document.getElementById("show-pickup");
const dropoffLocElement = document.getElementById("show-dropoff");

pickupLocElement.value = diningHall;
pickupLocElement.setAttribute("readonly", "readonly");
dropoffLocElement.value = residence;
dropoffLocElement.setAttribute("readonly", "readonly");

const orderKeys = orderCart.getOINames();

let pointTotal = 0;

// Conduct order-item-specific operations
for (let i = 0; i < orderCart.OIListLength(); i++) {

  // Creating div elements for each part of OI (Order Item) and assigning respective values
  let OI = document.createElement('div');
  OI.classList.add('order-item');

  // Assigning name and price
  let titlePriceCont = document.createElement('div');
  titlePriceCont.classList.add('title-price-container');
  let OITitle = document.createElement('div');
  OITitle.classList.add('order-item-title');
  OITitle.innerHTML = orderKeys[i];
  let OIPrice = document.createElement('div');
  OIPrice.classList.add('order-item-price');
  // OIPrice.innerHTML = orderCart.getIOValueByName(orderKeys[i]) + " point(s)";
  OIPrice.innerHTML = 1 + " point(s)";

  // Assigning quantity and adding plus and minus buttons for cart editing
  let OIQuanCont = document.createElement('div');
  OIQuanCont.classList.add('order-item-quantity-container');
  let minusQuan = document.createElement('button');
  minusQuan.classList.add('minus-quantity-button');
  minusQuan.innerHTML = "-";
  minusQuan.addEventListener("click", () => {
    if (pointTotal == 1) {
      alert("Cart must have at least 1 item.");
    }
    else {
      let newCount = orderCart.removeOI(orderKeys[i]);

      if (newCount === 0) {
        OI.remove();
      }
      else OIQuan.innerHTML = newCount;

      pointTotal -= 1;
      totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";
      OIPrice.innerHTML = orderCart.getIOValueByName(orderKeys[i]) + " point(s)";
    }
  });
  let OIQuan = document.createElement('div');
  OIQuan.classList.add('order-item-quantity');
  OIQuan.innerHTML = orderCart.getIOValueByName(orderKeys[i]);
  let plusQuan = document.createElement('button');
  plusQuan.classList.add('plus-quantity-button');
  plusQuan.innerHTML = "+";
  plusQuan.addEventListener("click", () => {
  
    let newCount = orderCart.addOI(orderKeys[i]);

    OIQuan.innerHTML = newCount;

    pointTotal += 1;
    totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";
    OIPrice.innerHTML = orderCart.getIOValueByName(orderKeys[i]) + " point(s)";

  });

  OI.appendChild(titlePriceCont);
  OI.appendChild(OIQuanCont);

  titlePriceCont.appendChild(OITitle);
  titlePriceCont.appendChild(OIPrice);

  OIQuanCont.appendChild(minusQuan);
  OIQuanCont.appendChild(OIQuan);
  OIQuanCont.appendChild(plusQuan);

  orderListElement.appendChild(OI);

  pointTotal += orderCart.getIOValueByName(orderKeys[i]);

}

// Display points for user
const totalPoints = document.getElementById('total');
totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";

// Hardwired back button
const backButton = document.getElementById('backBtn');
backButton.addEventListener('click', () => {
  // Navigate to order.html
  window.location.href = 'order.html';
});

// Hardwired continue button 
const continueButton = document.getElementById('continue-button');
continueButton.addEventListener('click', () => {
  // Get the info for the order
  let orderer = document.getElementById("enter-name").value;
  let phone = document.getElementById("enter-phone").value;
  let email = document.getElementById("enter-email").value;
  let food = orderCart.getOINames();
  // Ensure that all fields are populated
  if (!orderer.trim() || !phone.trim() || !email.trim()) {
    alert("You have forgotten to enter your name, phone, and/or email!");
    return;
  }
  // Save the order
  let newOrder = new Order(orderer, diningHall, residence, food);
  let storedOrder = createOrder(newOrder);
  // Navigate to thank-you.html
  window.location.href = 'thank-you.html';
});

async function createOrder(order) {
  console.log(order);
  order = JSON.stringify(order);
  try{
    let orderResponse = await fetch(`${URL}/order-create?order=${order}`, {
      method: "POST",
    });
    // Return the data posted successfully
    console.log("Successfully created order");
    
  } catch(ex) {
    console.log("Failed to create order");
    return null;
  }
}