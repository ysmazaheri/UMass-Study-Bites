class Users {
    constructor() {
      // we use an in-memory "database"; this isn't persistent but is easy
      // default user
      this.users = { emery: 'compsci326' };
      this.tokenCount = { emery: 1 };

    }
  
    // Returns true iff the user exists.
    findUser(username) {
      if (!this.users[username]) {
        return false;
      } else {
        return true;
      }
    }
  
    // Returns true iff the password is the one we have stored (in plaintext = bad
    // but easy).
    validatePassword(name, pwd) {
      if (!this.findUser(name)) {
        return false;
      }
      if (this.users[name] !== pwd) {
        return false;
      }
      return true;
    }
  
    // Add a user to the "database".
    addUser(name, pwd) {
      if (this.findUser(name)) {
        return false;
      }
      this.users[name] = pwd;
      this.tokenCount[name] = 1;
      return true;
    }

    // Get token count of user
    getTokenCount(name) {

        if (Object.keys(this.tokenCount).includes(name)) {

            return this.tokenCount[name];

        }
        else {

            return -1;

        }

    }

    // Adding tokens to user
    addTokens(name) {

        if (Object.keys(this.tokenCount).includes(name)) {

            return ++this.tokenCount[name];

        }
        else {

            return -1;

        }

    }

    // Removing tokens to user
    removeTokens(name) {

        if (Object.keys(this.tokenCount).includes(name)) {

            return --this.tokenCount[name];

        }
        else {

            return -1;

        }

    }

  }
  
  export default new Users();
  