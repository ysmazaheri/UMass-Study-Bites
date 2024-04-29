import express from "express";
import * as menuDB from "./js-databases/db-menu.js";
import * as userDB from "./js-databases/db-user.js";
import * as orderDB from "./js-databases/db-order.js";

const headerFields = { "Content-Type": "text/plain" };

const express = require('express');
const app = express();


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




/**
 * Asynchronously creates a order using provided order object. If the order is not
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

app.listen(3000);