//Object used to define each user, stored in PouchDB
export default class User {
    constructor(name,password){

        this.password = password;
        this.tokenCount = 1;
        this._id = name;
        this.deliverer = false;
    }

    addToken() { //Adds a token to the user

        this.tokenCount += 1;

    }

    removeToken() { //Removes a token from the user

        if(this.tokenCount <= 0) return;
        this.tokenCount -= 1;

    }

    hasTokens() { //Checks if user has any tokens, returns boolean

        return this.tokenCount > 0;

    }

    validatePassword(pass) { //Checks if inputted password matches stored value. These would be encrypted hashes in a live version

        return pass === this.password;

    }

}