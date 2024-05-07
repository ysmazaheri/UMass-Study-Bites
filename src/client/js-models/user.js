export default class User {
    constructor(name,password){
        this.password = password;
        this.tokenCount = 0;
        this._id = name;
        this.residence = "";
        this.favoriteLocation = "";

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
    hasResidence() {
        return this.residence !== "";
    }
    hasFavoriteLocation() {
        return this.favoriteLocation !== "";
    }
}