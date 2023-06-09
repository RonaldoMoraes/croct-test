const sqlite3 = require('sqlite3').verbose();
const Translator = require('./translator');

class SQLiteTranslator extends Translator {
    constructor() {
        super();
        this.db = new sqlite3.Database('IPs.sqlite');
        process.on('SIGINT', () => {
            this.db.close();
        });
    }

    getLocation(ip) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT latitude, longitude, country, state, city, ip FROM IPs WHERE ip = ? LIMIT 1';
            this.db.get(query, [ip], (error, row) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve(row ?? {});
                }
            });
        });
    }
}

module.exports = SQLiteTranslator;
