class Translator {
    constructor() {
        if (this.constructor === Translator) {
            throw new Error('Abstract classes cannot be instantiated');
        }
    }

    getLocation(_ip) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented'));
        });
    }

    async fetchLocation(ip) {
        return await this.getLocation(ip);
    }
}

module.exports = Translator;
