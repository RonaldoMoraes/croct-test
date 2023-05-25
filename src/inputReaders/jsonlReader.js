const fs = require('fs');
const path = require('path');

class JSONLReader {
    readEvents() {
        return new Promise((resolve, reject) => {
            const events = [];
            const file = path.resolve('data/input.jsonl');

            const stream = fs.createReadStream(file, { encoding: 'utf-8' });
            stream.on('data', (data) => {
                const lines = data.trim().split('\n');
                lines.forEach((line) => {
                    const event = JSON.parse(line);
                    events.push(event);
                });
            });

            stream.on('end', () => {
                resolve(events);
            });

            stream.on('error', (error) => {
                reject(error);
            });
        });
    }
}
module.exports = JSONLReader;
