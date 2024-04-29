const userDB = new PouchDB("users");

/**
 * Asynchronously adds a new user to the database, generating a random id in the process
 * @async
 * @param {string} username - The user's unique account name (probably just their real name)
 * @param {string} password - The password for the user (could be hashed if we need actual security)
 * @param {object} info     - The user's additional information - JSON object, specifics to be decided later
 * @returns {Promise<void>} - A promise that resolves when the user is saved
 * @throws {Error} - Throws an error if the operation fails
 */
export async function createUser(user) {
    await userDB.post(user);
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

