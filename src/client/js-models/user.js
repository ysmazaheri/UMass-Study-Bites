export default class User {
    constructor(name,password){

        this.password = password;
        this.tokenCount = 1;
        this._id = name;

    }

    addToken() {

        this.tokenCount += 1;

    }

    removeToken() {

        if(this.tokenCount <= 0) return;
        this.tokenCount -= 1;

    }

    hasTokens() {

        return this.tokenCount > 0;

    }

    validatePassword(pass) {

        return pass === this.password;

    }

}