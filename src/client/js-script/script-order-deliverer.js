/*import OrderStorage from "../js-models/OrderStorage.js";
import Order from "../js-models/order.js";
import OrderCart from "../js-models/orderCart.js";
*/

const URL = "http://localhost:3000";
const buttonOne = document.getElementById("btnone");
const buttonTwo = document.getElementById("btntwo");

// Get the buttons
const btnOne = document.getElementById('btnone');
const btnTwo = document.getElementById('btntwo');

btnOne.addEventListener('click', async function () {
 
    const orderId = 1; //place holder for actualy orderIDs
    try {
      const response = await fetch(`${URL}/order-complete?id=${orderId}`, {
        method: 'POST'
      });
      if (response.ok) {
        // Order completed successfully, 
        //show confirmation to the person who ordered (a different user).
   
      } else {
        console.error('Error completing order');
        alert('Error completing order');
      }
    } catch (error) {
      console.error('Error completing order', error);
      alert('Error completing order');
    }
});


btnTwo.addEventListener('click', async function () {
    const orderId = 2; //place holder for actual orderIDs
    try {
      const response = await fetch(`${URL}/complete-order/${orderId}`, {
        method: 'POST'
      });
      if (response.ok) {
        // Order completed successfully, 
        //show confirmation to the person who ordered (a different user).
      } else {
        console.error('Error completing order');
        alert('Error completing order');
      }
    } catch (error) {
      console.error('Error completing order', error);
      alert('Error completing order');
    }
})
