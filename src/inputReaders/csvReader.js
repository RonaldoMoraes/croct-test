const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

class CSVReader {
    readEvents() {
        return new Promise((resolve, reject) => {
            const events = [];
            const file = path.resolve('data/input.csv');

            fs.createReadStream(file)
                .pipe(csv())
                .on('data', (data) => {
                    events.push(data);
                })
                .on('end', () => {
                    resolve(events);
                })
                .on('error', (error) => {
                    console.log('Error reading CSV file:', error);
                    reject(error);
                });
        });
    }
}

module.exports = CSVReader;
