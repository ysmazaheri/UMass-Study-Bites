import { OrderStorage } from "../js-models/OrderStorage.js";
const orderStorage = new OrderStorage();

const URL = "http://localhost:3000";

// Get the buttons
const btnOne = document.getElementById('btnone');
const btnTwo = document.getElementById('btntwo');


btnOne.addEventListener('click', async function () {
  const orderId = orderStorage.getId();
  
  try {
    const response = await fetch(`${URL}/order-complete?id=${orderId}`, {
      method: 'PUT'
    });
    if (response.ok) {
      // Order completed successfully
      try {
        const response = await fetch(`${URL}/order-delete?=${orderId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Successfully deleted order from database');
        }
      } catch (error) {
        console.error('Error deleting order', error);
        alert('Error deleting order');
      }
    }
  } catch (error) {
    console.error('Error completing order', error);
    alert('Error completing order');
  }
});


btnTwo.addEventListener('click', async function () {
  const orderId = orderStorage.getId();
  
  try {
    const response = await fetch(`${URL}/order-complete?id=${orderId}`, {
      method: 'PUT'
    });
    if (response.ok) {
      // Order completed successfully
      try {
        const response = await fetch(`${URL}/order-delete?=${orderId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Successfully deleted order from database');
        }
      } catch (error) {
        console.error('Error deleting order', error);
        alert('Error deleting order');
      }
    }
  } catch (error) {
    console.error('Error completing order', error);
    alert('Error completing order');
  }
})
