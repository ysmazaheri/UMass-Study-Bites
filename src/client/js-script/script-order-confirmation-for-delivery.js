import { OrderCart } from "../js-models/OrderCart.js";
import { OrderStorage } from "../js-models/OrderStorage.js";

const orderCart = new OrderCart();

// Setting order cart to be the order cart of the current order

const URL = "http://localhost:3000";
let id;
let rev;
let food;

try {
  
  let getOrderResponse = await fetch(`${URL}/order-read?id=${window.localStorage.getItem('orderId')}`);
  let data = await getOrderResponse.json();

  id = data._id;
  rev = data._rev;
  food = data.food;

  for (let i = 0; i < food.length; i++) {

    orderCart.addOI(food[i]);

  }

}
catch (err) {

  console.log('Unable to read order');

}


const orderStorage = new OrderStorage();
const orderListElement = document.getElementById('order-preview-list');

const orderKeys = orderCart.getOINames();

let pointTotal = 0;

// Conduct order-item-specific operations
for (let i = 0; i < orderCart.OIListLength(); i++) {

  // Creating div elements for each part of OI (Order Item) and assigning respective values
  let OI = document.createElement('div');
  OI.classList.add('order-item');

  // Assigning name and price to the div elements
  let titlePriceCont = document.createElement('div');
  titlePriceCont.classList.add('title-price-container');
  let OITitle = document.createElement('div');
  OITitle.classList.add('order-item-title');
  OITitle.innerHTML = orderKeys[i];
  let OIPrice = document.createElement('div');
  OIPrice.classList.add('order-item-price');
  // OIPrice.innerHTML = orderCart.getIOValueByName(orderKeys[i]) + " point(s)";
  OIPrice.innerHTML = 1 + " point(s)";

  // Creating & assigning "quantity" and "plus" and "minus? buttons for cart editing
  let OIQuanCont = document.createElement('div');
  OIQuanCont.classList.add('order-item-quantity-container');
  let OIQuan = document.createElement('div');
  OIQuan.classList.add('order-item-quantity');
  OIQuan.innerHTML = orderCart.getIOValueByName(orderKeys[i]);

  OI.appendChild(titlePriceCont);
  OI.appendChild(OIQuanCont);

  titlePriceCont.appendChild(OITitle);
  titlePriceCont.appendChild(OIPrice);

  OIQuanCont.appendChild(OIQuan);

  orderListElement.appendChild(OI);

  pointTotal += orderCart.getIOValueByName(orderKeys[i]);

}

// Display points for user
const totalPoints = document.getElementById('total');
totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";

// Hardwired back button
const backButton = document.getElementById('backBtn');
backButton.addEventListener('click', () => {
  // Navigate to location-select.html
  window.location.href = 'deliver.html';
});

// Input fields for showing and displaying order information
const nameInput = document.getElementById('name-input');
const pickUpInput = document.getElementById('pick-up-input');
const deliveryInput = document.getElementById('delivery-input');
// Populate input fields
nameInput.value = orderStorage.getName();
pickUpInput.value = orderStorage.getDelivery();
deliveryInput.value = orderStorage.getPickUp();

// Hardwired continue button 
const continueButton = document.getElementById('continue-button');
continueButton.addEventListener('click', deleteAndRedirect);


/*
* Upon completion of a delivery, the order is removed from the database via a fetch call
* Logs the success or failure of this deletion, then redirects the user to the thank you page
*/
async function deleteAndRedirect(){
  //fetch delete the current order
  try{
    let res = await fetch(`http://localhost:3000/order-delete?id=${id}&rev=${rev}`,{
      method: "DELETE"
    });
    console.log(res.body);
  }catch(ex){
    console.log('Failed to delete order.');
  }

  // Navigate to thank-you.html
  window.location.href = 'thank-you.html';
}