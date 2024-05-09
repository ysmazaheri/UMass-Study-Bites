import { OrderStorage } from "../js-models/OrderStorage.js";
import { OrderCart } from "../js-models/OrderCart.js";

const pickupFilerElement = document.getElementById('pickup-search');
const dropoffFilerElement = document.getElementById('delivery-search');
const orderListElement = document.getElementById('order-list');

const orderStorage = new OrderStorage();
const ls = window.localStorage;
const URL = "http://localhost:3000";

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
    // Filter via "contains"
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

loadOrders();
//loads all existing orders via fetch() and populates the list on screen
async function loadOrders(){
    let orders = null;
    try{
        let allOrdersResp = await fetch(`${URL}/order-all`, {
          method: "GET",
        });
        let ordersObj = await allOrdersResp.json();
        orders = ordersObj.orders;
    }catch(err){
        console.log(err);
        console.log("Failed to load orders!");
        return;
    }
    
    
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

    // Orders is a list of objects, thus sortable
    orders.forEach(order => {
        // If the order is non-empty, add it to the HTML
        if (Object.keys(order).length !== 0) {
            // Overall Div
            let listItem = document.createElement('div');
            listItem.classList.add('order');
            // Add name details
            let name = document.createElement('div');
            name.classList.add('order-info','order-name');
            name.textContent = order.orderer.split(' ')[0]; //sets text to first name of orderer
            listItem.appendChild(name);
            // Add pickup details
            let pickup = document.createElement('div');
            pickup.classList.add('order-info','order-pickup');
            pickup.textContent = order.diningHall;
            listItem.appendChild(pickup);
            // Add dropoff details
            let delivery = document.createElement('div');
            delivery.classList.add('order-info','order-delivery');
            delivery.textContent = order.residence;
            listItem.appendChild(delivery);
            // Add time details
            let time = document.createElement('div');
            time.classList.add('order-info','order-time');
            time.textContent = order.time;
            listItem.appendChild(time);
            // Add click functionality
            listItem.addEventListener("click", () => {
                // When the order is selected for delivery, retrieve its info and provide it to user
                ls.removeItem('OIList');
                // Retrieve food contents
                let orderCart = new OrderCart();
                for (const [name, amount] of Object.entries(order.food)) {
                    for (let i = 0; i < amount; i++) {
                        orderCart.addOI(name);
                    }
                }
                // Retrieve the pick up location
                orderStorage.savePickUp(order.diningHall);
                // Retrieve the drop off location
                orderStorage.saveDropOff(order.residence);
                // Retrieve the name of the recipeint
                orderStorage.saveName(order.orderer.split(' ')[0]);
                // Go to delivery confirmation page, displaying the retrieved information for confirmation
                window.location.href = 'order-confirmation-for-delivery.html';
            });
            // Append completed order object to the HTML structure
            orderListElement.appendChild(listItem);
        }
    });
}


