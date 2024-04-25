import { OrderCart } from "../js-models/OrderCart.js";

const orderCart = new OrderCart();
const orderListElement = document.getElementById('order-preview-list');

const orderKeys = orderCart.getOINames();

let pointTotal = 0;

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
  
    let newCount = orderCart.removeOI(orderKeys[i]);

    if (newCount === 0) {
      OI.remove();
    }
    else OIQuan.innerHTML = newCount;

    pointTotal -= 1;
    totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";

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

const totalPoints = document.getElementById('total');
totalPoints.innerHTML = "Total: " + pointTotal + " point(s)";

// Back Button

const backButton = document.getElementById('backBtn');

backButton.addEventListener('click', () => {
  // Navigate to location-select.html
  window.location.href = 'order.html';
});

// Continue button 

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', () => {

  window.location.href = 'thank-you.html';

});