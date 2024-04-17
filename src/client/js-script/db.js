import PouchDB from "pouchdb";

/*instantiating our PouchDB and filling with dummy data*/
let menuDB = new PouchDB("menu");
let userDB = new PouchDB("users");

/**
 * Asynchronously adds a new user to the database, generating a random id in the process
 * @async
 * @param {string} username - The user's unique account name (probably just their real name)
 * @param {string} password - The password for the user (could be hashed if we need actual security)
 * @param {object} info     - The user's additional information - JSON object, specifics to be decided later
 * @returns {Promise<void>} - A promise that resolves when the user is saved
 * @throws {Error} - Throws an error if the operation fails
 */
export async function createUser(username,password,info) {
    await userDB.post({ username,password,info });
}

/**
 * Asynchronously modifies an existing user in the database.
 *
 * @async
 * @param {Object} user - The user to be updated.
 * @returns {Promise<void>} - A promise that resolves when the user is modified
 * @throws {Error} - Throws an error if the operation fails
 */
export async function modifyUser(user) {
    await userDB.put(user);
}

/**
 * Asynchronously retrieves a user from the database by its id.
 *
 * @async
 * @param {string} userId - The id of the user to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the user.
 * @throws {Error} - Throws an error if the user cannot be found or if there
 * is a database issue.
 */
export async function loadUser(userId) {
    const user = await userDB.get(userId);
    return user;
}

/**
 * Asynchronously removes a user from the database by its id.
 *
 * @async
 * @param {string} userId - The id of the user to be removed.
 * @returns {Promise<void>} - A promise that resolves when the user has been
 * successfully removed.
 * @throws {Error} - Throws an error if the user cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeUser(userId) {
    userDB.remove(userId);
}

/**
 * Asynchronously adds a new menu to the database, generating a random id in the process
 * @async
 * @param {object} menu - JSON object representing a menu
 * @param {string} date - Date of relevance of the menu (format to be decided)
 * @param {string} meal - Type of meal the menu represents (breakfast, lunch, dinner, late-night)
 * @returns {Promise<void>} - A promise that resolves when the menu has been saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function createMenu(menu,date,meal) {
    await menuDB.post({ menu,date,meal });
}

/**
 * Asynchronously modifies an existing menu in the database.
 *
 * @async
 * @param {Object} user - The menu to be updated.
 * @returns {Promise<void>} - A promise that resolves when the menu has been
 * successfully modified.
 * @throws {Error} - Throws an error if the operation fails, e.g., the menu
 * does not exist or database issues.
 */
export async function modifyMenu(menu) {
    await menuDB.put(menu);
}

/**
 * Asynchronously retrieves a menu from the database by its id.
 *
 * @async
 * @param {string} userId - The id of the menu to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the menu.
 * @throws {Error} - Throws an error if the menu cannot be found or if there
 * is a database issue.
 */
export async function loadMenu(menuId) {
    const menu = await menuDB.get(menuId);
    return menu;
}

/**
 * Asynchronously removes a menu from the database by its id.
 *
 * @async
 * @param {string} menuId - The id of the menu to be removed.
 * @returns {Promise<void>} - A promise that resolves when the menu has been
 * successfully removed.
 * @throws {Error} - Throws an error if the menu cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeCounter(menuId) {
    menuDB.remove(menuId);
}