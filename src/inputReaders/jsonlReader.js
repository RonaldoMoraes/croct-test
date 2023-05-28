const fs = require('fs');
const path = require('path');

class JSONLReader {
    getReadStream() {
        const file = path.resolve('data/input.jsonl');
        return fs.createReadStream(file, { encoding: 'utf-8' });
    }

    parseLine(line) {
        return JSON.parse(line);
    }

}
module.exports = JSONLReader;
