const sqlite3 = require('sqlite3').verbose();

class SQLiteTranslator {
    constructor() {
        this.db = new sqlite3.Database('IPs.sqlite', sqlite3.OPEN_READONLY);
    }

    getLocation(ip) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT latitude, longitude, country, city FROM IPs WHERE ip = ? LIMIT 1';
            this.db.get(query, [ip], (error, row) => {
                if (error) {
                    // console.log('Error querying SQLite database:', error);
                    reject(error);
                    return;
                }

                if (!row) {
                    // console.log('Error querying SQLite database for IP: ', ip);
                    reject(new Error(`No location found for IP: ${ip}`));
                    return;
                }

                resolve(row);
            });
        });
    }
}

module.exports = SQLiteTranslator;
