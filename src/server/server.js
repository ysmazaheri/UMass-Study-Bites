import express from "express";
import path from "path";
import * as menuDB from "./js-databases/db-menu.js";
import * as userDB from "./js-databases/db-user.js";
import * as orderDB from "./js-databases/db-order.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const headerFields = { "Content-Type": "text/plain" };
const jsonFields = { "Content-Type": "application/json" }

//const express = require('express');

/**
 * Asynchronously creates a menu using provided menu object. If the menu is not
 * provided, it responds with a 400 status code indicating a bad request.
 *
 * @async
 * @param {object} response - The HTTP response object used to send back data to
 * the client. It must have `writeHead`, `write`, and `end` methods available.
 * @param {string} [menu] - The menu to be created. If not
 * provided, the function will respond with an error message.
 */
async function createMenu(response, menu) {
  if (menu === undefined) {
    response.writeHead(400, headerFields);
    response.write("Error: Menu Object Required");
    response.end();
  } else {
    try {
      await menuDB.createMenu(menu);
      response.writeHead(200, headerFields);
      response.write("Menu Created");
      response.end();
    } catch (err) {
      response.writeHead(500, headerFields);
      response.write("Internal Server Error: Could Not Create Menu");
      response.end();
    }
  }
}

/**
 * Asynchronously reads the value of a specified menu by its dining hall and meal. If the
 * menu is found, it responds with a 200 status code and the menu's food JSON object.
 * If the menu is not found, it catches the error and responds with a 404
 * status code indicating that the menu could not be found.
 *
 * @async
 * @param {object} response - The HTTP response object used to send data back to
 * the client. It must support `writeHead`, `write`, and `end` methods.
 * @param {string} diningHall - The dining hall of the menu to be read.
 * @param {string} meal - The meal of the menu to be read.
 * @throws {Error} - If there is an issue loading the meal (e.g., the meal
 * does not exist), an error is thrown and caught within the function. The
 * client is then informed that the meal was not found.
 */
async function readMenu(response, diningHall, meal) {
  try {
    let menus = await menuDB.loadAllMenus();
    let menu = menus.filter(x => x.diningHall === diningHall && x.meal === meal)[0];
    let menuJson = JSON.stringify(menu);
    response.writeHead(200, jsonFields);
    response.write(menuJson);
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Applicable Menu Not Found');
    response.end();
  }
}

/**
 * Asynchronously updates the food value of a specified menu. 
 * It first tries to load the menu from the database using the
 * provided information. If the menu cannot be found, it responds with a 404 status
 * code, indicating that the menu does not exist.
 *
 * @async
 * @param {object} response - The HTTP response object for sending data back to
 * the client. It is expected to have `writeHead`, `write`, and `end` methods.
 * @param {string} diningHall - The dining hall of the menu to be read.
 * @param {string} meal - The meal of the menu to be read.
 * @param {Object} food - JSON object representing the new food on the menu
 * @throws {Error} - If the menu cannot be found or if there is a problem
 * updating the menu in the database, an error is thrown and caught within
 * the function. The client is then notified that the menu was not found.
 */
async function updateMenu(response, diningHall, meal, food) {
  try {
    const menu = await menuDB.loadAllMenus().filter(x => x.diningHall === diningHall && x.meal === meal)[0];
    menu.food = food;
    await menuDB.modifyMenu(menu);
    response.writeHead(200, headerFields);
    response.write('Menu Updated');
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Applicable Menu Not Found');
    response.end();
  }
}


/**
 * Asynchronously deletes a specified menu by its dining hall and meal. The function attempts
 * to find the menu in the database. If the menu cannot be found, it
 * responds with a 404 status code, indicating that the menu does not exist.
 *
 * It's important to note that the removal from the database happens after
 * sending the response to the client. This means the client is informed of the
 * deletion before the deletion process completes in the database.
 *
 * @async
 * @param {object} response - The HTTP response object for sending back data to
 * the client. This object must include `writeHead`, `write`, and `end` methods
 * to properly send the response.
 * @param {string} diningHall - The dining hall of the menu to be read.
 * @param {string} meal - The meal of the menu to be read.
 * @throws {Error} - If there is an issue loading the menu (e.g., the menu
 * does not exist), an error is thrown and caught within the function. The
 * client is then informed that the menu was not found with a 404 response.
 */
async function deleteMenu(response, id) {
  try {
    //const menu = await menuDB.loadAllMenus().filter(x => x.diningHall === diningHall && x.meal === meal)[0];
    await menuDB.removeMenu(id);
    response.writeHead(200, headerFields);
    response.write('Menu Deleted');
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Applicable Menu Not Found');
    response.end();
  }
}

/**
 * Asynchronously retrieves and sends a list of all menus stored in the
 * database to the client. On success, it formats the menus into an array
 * and responds with a 200 status code. If an error occurs (e.g., the database
 * cannot be accessed), it responds with a 500 status code indicating an
 * internal server error and provides a message detailing the issue.
 *
 * This function encapsulates the entire process of fetching menus,
 * formatting them into a readable HTML response, and handling potential errors
 * that may arise during the process, ensuring the client is appropriately
 * informed of the outcome.
 *
 * @async
 * @param {object} response - The HTTP response object for sending back data to
 * the client. This object should include `writeHead`, `write`, and `end`
 * methods to facilitate sending HTTP responses.
 * @throws {Error} - Encounters and handles internal errors by responding with a
 * 500 status code and details of the error. This catch block ensures that the
 * client receives a meaningful error message rather than the request hanging or
 * terminating unexpectedly.
 */
async function dumpMenus(response) {
  try {
    const menus = await menuDB.loadAllMenus();
    let responseBody = {"menus":menus};
    responseBody = JSON.stringify(responseBody);

    response.writeHead(200, jsonFields);
    response.write(responseBody);
    response.end();
  } catch (err) {
    response.writeHead(500, headerFields);
    response.write('Internal Server Error: Could Not Get Menus');
    response.end();
  }
}



/**
 * Asynchronously creates an order using provided order object. If the order is not
 * provided, it responds with a 400 status code indicating a bad request.
 *
 * @async
 * @param {object} response - The HTTP response object used to send back data to
 * the client. It must have `writeHead`, `write`, and `end` methods available.
 * @param {string} [order] - The order to be created. If not
 * provided, the function will respond with an error message.
 */
async function createOrder(response, order) {
  if (order === undefined) {
    response.writeHead(400, headerFields);
    response.write("Error: Order Object Required");
    response.end();
  } else {
    try {
      await orderDB.createOrder(order);
      response.writeHead(200, headerFields);
      response.write("Order Created");
      response.end();
    } catch (err) {
      response.writeHead(500, headerFields);
      response.write("Internal Server Error: Could Not Create Order");
      response.end();
    }
  }
}

/**
 * Asynchronously reads the value of a specified order by its id. If the
 * order is found, it responds with a 200 status code and the order's JSON object.
 * If the order is not found, it catches the error and responds with a 404
 * status code indicating that the order could not be found.
 *
 * @async
 * @param {object} response - The HTTP response object used to send data back to
 * the client. It must support `writeHead`, `write`, and `end` methods.
 * @param {string} id - The id of the order to be read.
 * @throws {Error} - If there is an issue loading the order (e.g., the order
 * does not exist), an error is thrown and caught within the function. The
 * client is then informed that the order was not found.
 */
async function readOrder(response, id) {
  try {
    const order = await orderDB.loadOrder(id);
    response.writeHead(200, jsonFields);
    response.write(order);
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Order Not Found');
    response.end();
  }
}

/**
 * Asynchronously updates the values of a specified order. 
 * It first tries to load the order from the database using the
 * provided information. If the order cannot be found, it responds with a 404 status
 * code, indicating that the order does not exist.
 *
 * @async
 * @param {object} response - The HTTP response object for sending data back to
 * the client. It is expected to have `writeHead`, `write`, and `end` methods.
 * @param {string} id - The id of the order to be read.
 * @param {string} deliverer - The deliverer of the order to be assigned.
 * @throws {Error} - If the order cannot be found or if there is a problem
 * updating the order in the database, an error is thrown and caught within
 * the function. The client is then notified that the order was not found.
 */
async function updateOrder(response, id, deliverer) {
  try {
    const order = await orderDB.loadOrder(id);
    order.setDeliverer(deliverer);
    await orderDB.modifyOrder(order);
    response.writeHead(200, headerFields);
    response.write('Order Updated');
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Order Not Found');
    response.end();
  }
}

/**
 * Asynchronously updates the values of a specified order. 
 * It first tries to load the order from the database using the
 * provided information. If the order cannot be found, it responds with a 404 status
 * code, indicating that the order does not exist.
 *
 * @async
 * @param {object} response - The HTTP response object for sending data back to
 * the client. It is expected to have `writeHead`, `write`, and `end` methods.
 * @param {string} id - The id of the order to be completed.
 * @throws {Error} - If the order cannot be found or if there is a problem
 * updating the order in the database, an error is thrown and caught within
 * the function. The client is then notified that the order was not found.
 */
async function completeOrder(response, id) {
  try {
    const order = await orderDB.loadOrder(id);
    order.completeOrder();
    await orderDB.modifyOrder(order);
    response.writeHead(200, headerFields);
    response.write('Order Completed');
    response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Order Not Found');
    response.end();
  }
}


/**
 * Asynchronously deletes a specified order by its id. The function attempts
 * to find the order in the database. If the order cannot be found, it
 * responds with a 404 status code, indicating that the order does not exist.
 *
 * It's important to note that the removal from the database happens after
 * sending the response to the client. This means the client is informed of the
 * deletion before the deletion process completes in the database.
 *
 * @async
 * @param {object} response - The HTTP response object for sending back data to
 * the client. This object must include `writeHead`, `write`, and `end` methods
 * to properly send the response.
 * @param {string} id - The id of the order to be read.
 * @throws {Error} - If there is an issue loading the order (e.g., the order
 * does not exist), an error is thrown and caught within the function. The
 * client is then informed that the order was not found with a 404 response.
 */
async function deleteOrder(response, id) {
  try {
    const order = await orderDB.loadOrder(id);
    response.writeHead(200, headerFields);
    response.write('Order Deleted');
    response.end();
    orderDB.removeOrder(id);
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write('Error: Order Not Found');
    response.end();
  }
}

/**
 * Asynchronously retrieves and sends a list of all orders stored in the
 * database to the client. On success, it formats the orders into an array
 * and responds with a 200 status code. If an error occurs (e.g., the database
 * cannot be accessed), it responds with a 500 status code indicating an
 * internal server error and provides a message detailing the issue.
 *
 * This function encapsulates the entire process of fetching orders,
 * formatting them into a readable HTML response, and handling potential errors
 * that may arise during the process, ensuring the client is appropriately
 * informed of the outcome.
 *
 * @async
 * @param {object} response - The HTTP response object for sending back data to
 * the client. This object should include `writeHead`, `write`, and `end`
 * methods to facilitate sending HTTP responses.
 * @throws {Error} - Encounters and handles internal errors by responding with a
 * 500 status code and details of the error. This catch block ensures that the
 * client receives a meaningful error message rather than the request hanging or
 * terminating unexpectedly.
 */
async function dumpOrders(response) {
  try {
    const orders = await orderDB.loadAllOrders();
    let responseBody = {"orders":orders};

    response.writeHead(200, jsonFields);
    response.write(responseBody);
    response.end();
  } catch (err) {
    response.writeHead(500, headerFields);
    response.write('Internal Server Error: Could Not Get Orders');
    response.end();
  }
}



/**
 * Asynchronously creates a user using provided user object. If the user is not
 * provided, it responds with a 400 status code indicating a bad request.
 *
 * @async
 * @param {object} response - The HTTP response object used to send back data to
 * the client. It must have `writeHead`, `write`, and `end` methods available.
 * @param {string} [user] - The user to be created. If not
 * provided, the function will respond with an error message.
 */
async function createUser(response, user) {
  if (user === undefined) {
    response.writeHead(400, headerFields);
    response.write("Error: User Object Required");
    response.end();
  } else {
    try {
      await userDB.createUser(user);
      response.writeHead(200, headerFields);
      response.write("User Created");
      response.end();
    } catch (err) {
      response.writeHead(500, headerFields);
      response.write("Internal Server Error: Could Not Create User");
      response.end();
    }
  }
}

/*************************/
//SAVING THE REST OF USER DB MANAGEMENT FOR LATER
/*************************/


const app = express();
const port = 3000;

//This is from exercise 8, unsure if it is the settings we want
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/")));

//This is to allow CORS 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const MethodNotAllowedHandler = async (request, response) => {
  response.status(405).type('text/plain').send('Method Not Allowed');
};


//menu routes

app
  .route("/menu-read")
  .get(async (request, response) => {
    const options = request.query;
    console.log(options);
    await readMenu(response, options.diningHall, options.meal);
  })
  .all(MethodNotAllowedHandler);

app
  .route("/menu-create")
  .post(async (request, response) => {
    const options = request.query;
    let menuJSON = JSON.parse(options.menu);
    await createMenu(response, menuJSON);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/menu-update")
  .put(async (request, response) => {
    const options = request.query;
    await updateMenu(response, options.diningHall, options.meal, options.food);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/menu-delete")
  .delete(async (request, response) => {
    const options = request.query;
    await deleteMenu(response, options.id);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/menu-all")
  .get(async (request, response) => {
    await dumpMenus(response);
  })
  .all(MethodNotAllowedHandler);

  //orders
  app
  .route("/order-read")
  .get(async (request, response) => {
    const options = request.query;
    await readOrder(response, options.id);
  })
  .all(MethodNotAllowedHandler);

app
  .route("/order-create")
  .post(async (request, response) => {
    const options = request.query;
    await createOrder(response, options.order);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/order-update")
  .put(async (request, response) => {
    const options = request.query;
    await updateOrder(response, options.id, options.deliverer);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/order-complete")
  .put(async (request, response) => {
    const options = request.query;
    await completeOrder(response, options.id);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/order-delete")
  .delete(async (request, response) => {
    const options = request.query;
    await deleteOrder(response, options.id);
  })
  .all(MethodNotAllowedHandler);

  app
  .route("/order-all")
  .get(async (request, response) => {
    await dumpOrders(response);
  })
  .all(MethodNotAllowedHandler);

  //USER ROUTES NOT DONE

// this should always be the last route
app.route("*").all(async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port);