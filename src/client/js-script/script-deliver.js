//import { loadAllOrders } from "../../server/js-databases/db-order.js";
import { OrderStorage } from "../js-models/OrderStorage.js";
import { OrderCart } from "../js-models/OrderCart.js";

const pickupFilerElement = document.getElementById('pickup-search');
const dropoffFilerElement = document.getElementById('delivery-search');
const orderListElement = document.getElementById('order-list');

const orderStorage = new OrderStorage();
const ls = window.localStorage;

let orderOptions = document.getElementsByClassName('order');

// Refine search every time the input value changes
pickupFilerElement.addEventListener('input', filterOptions);
dropoffFilerElement.addEventListener('input', filterOptions);

function filterOptions() {
    // Update the list of what order options are on the page currently, in case it has changed
    orderOptions = document.getElementsByClassName('order');
    let orderOptionsArr = [].slice.call(orderOptions);
    // Get the search query
    let pickupQuery = String(pickupFilerElement.value).toLowerCase();
    let dropoffQuery = String(dropoffFilerElement.value).toLowerCase();
    // Filter via contains
    orderOptionsArr.forEach(orderOption => {
        // Order options are list items. The contents are children HTML elements, divs
        let orderPickup = orderOption.children[1];
        let orderPickupName = String(orderPickup.innerHTML).toLowerCase();
        let orderDropoff = orderOption.children[2];
        let orderDropoffName = String(orderDropoff.innerHTML).toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (orderPickupName.includes(pickupQuery) && orderDropoffName.includes(dropoffQuery)) {
            // Show if matches query
            orderOption.style.visibility = 'visible';
            orderOption.style.height = '35px';
        } else {
            // Show if doesn't match query
            orderOption.style.visibility = 'hidden';
            orderOption.style.height = '0px';
        }
    });
}

//loadOrders();

//loads all existing orders from PouchDB and populates the list on screen
//MUST SWITCH TO USING FETCH()
async function loadOrders(){
    let orders = await loadAllOrders();
    //adding the header content into the div
    orderListElement.innerHTML = `
                            <div id="order-list-header">
                                <div id="name-header" class="order-header">
                                    Recipient Name
                                </div>
                                <div id="pickup-header" class="order-header">
                                    Pickup Point
                                </div>
                                <div id="delivery-header" class="order-header">
                                    Delivery Point
                                </div>
                                <div id="time-header" class="order-header">
                                    Time Placed
                                </div>
                            </div>`;

    //orders is a list of objects, so we can sort it
    //TODO: not needed for this milestone, but should default to sorting by most recent
    orders.forEach(order => {

        if (Object.keys(order).length !== 0) {
            let listItem = document.createElement('div');
            listItem.classList.add('order');

            let name = document.createElement('div');
            name.classList.add('order-info','order-name');
            name.textContent = order.orderer.split(' ')[0]; //sets text to first name of orderer
            listItem.appendChild(name);

            let pickup = document.createElement('div');
            pickup.classList.add('order-info','order-pickup');
            pickup.textContent = order.diningHall;
            listItem.appendChild(pickup);

            let delivery = document.createElement('div');
            delivery.classList.add('order-info','order-delivery');
            delivery.textContent = order.residence;
            listItem.appendChild(delivery);

            let time = document.createElement('div');
            time.classList.add('order-info','order-time');
            time.textContent = order.time;
            listItem.appendChild(time);

            listItem.addEventListener("click", () => {

                ls.removeItem('OIList');

                let orderCart = new OrderCart();
                for (const [name, amount] of Object.entries(order.food)) {

                    for (let i = 0; i < amount; i++) {

                        orderCart.addOI(name);

                    }

                }

                orderStorage.savePickUp(order.diningHall);
                orderStorage.saveDropOff(order.residence);
                orderStorage.saveName(order.orderer.split(' ')[0]);

                window.location.href = 'order-confirmation-for-delivery.html';

            });

            orderListElement.appendChild(listItem);
        }

    });
}

// Adding orders to delivery page


