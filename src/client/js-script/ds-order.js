const ls = window.localStorage;

export class Order {

    #OIList;

    constructor() {

        if (ls.getItem('OIList') !== null) this.#OIList = JSON.parse(ls.getItem('OIList'));
        else {
            this.#OIList = {};
            ls.setItem('OIList', JSON.stringify(this.#OIList));
        }

    }

    OIListLength() {

        return Object.keys(this.#OIList).length;

    }

    addOI(name) {

        if (name in this.#OIList) this.#OIList[name] += 1;
        else this.#OIList[name] = 1;

        ls.setItem('OIList', JSON.stringify(this.#OIList));

    }

    getOINames() {

        return Object.keys(this.#OIList);

    }

    getIOValueByName(name) {

        return this.#OIList[name];

    }

    existsOI(name) {

        return name in this.#OIList;

    }

    printOIList() {

        console.log(this.#OIList);

    }

}