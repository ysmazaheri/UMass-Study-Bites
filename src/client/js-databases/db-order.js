import PouchDB from "pouchdb";

/*instantiating our PouchDB and filling with dummy data*/
let orderDB = new PouchDB("orders");

/**
 * Asynchronously adds a new user to the database, generating a random id in the process
 * @async
 * @param {string} info - The order's food information, in a plaintext string
 * @param {string} time - The order's timestamp (format to be decided)
 * @param {string} orderer - The user that the order belongs to
 * @param {string | undefined} pickup - The user picking up the order (initially undefined)
 * @returns {Promise<void>} - A promise that resolves when the order is saved
 * @throws {Error} - Throws an error if the operation fails
 */
export async function createOrder(info,time,orderer,pickup) {
    await orderDB.post({ info,time,orderer,pickup });
}

/**
 * Asynchronously modifies an existing order in the database.
 *
 * @async
 * @param {Object} user - The order to be updated.
 * @returns {Promise<void>} - A promise that resolves when the user is modified
 * @throws {Error} - Throws an error if the operation fails
 */
export async function modifyOrder(order) {
    await orderDB.put(order);
}

/**
 * Asynchronously retrieves an order from the database by its id.
 *
 * @async
 * @param {string} orderId - The id of the order to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the order.
 * @throws {Error} - Throws an error if the order cannot be found or if there
 * is a database issue.
 */
export async function loadOrder(orderId) {
    const order = await orderDB.get(orderId);
    return order;
}

/**
 * Asynchronously removes an order from the database by its id.
 *
 * @async
 * @param {string} orderId - The id of the order to be removed.
 * @returns {Promise<void>} - A promise that resolves when the order has been
 * successfully removed.
 * @throws {Error} - Throws an error if the order cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeOrder(orderId) {
    orderDB.remove(orderId);
}

/**
 * Asynchronously retrieves all orders from the database.
 *
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of
 * orders.
 * @throws {Error} - Throws an error if there is a problem accessing the
 * database.
 */
export async function loadAllOrders() {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  }