class Translator {
    constructor() {
        if (this.constructor === Translator) {
            throw new Error('Abstract classes cannot be instantiated');
        }
    }

    getLocation(_ip) {
        throw new Error('Not implemented');
    }

    async fetchLocation(ip) {
        return (await this.getLocation(ip)) ?? null;
    }
}

module.exports = Translator;
