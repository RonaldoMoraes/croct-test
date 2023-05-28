const fs = require('fs');
const path = require('path');

class JSONLReader {
    constructor() {
        this.file = path.resolve('data/input.jsonl');
    }

    getReadStream() {
        return fs.createReadStream(this.file, { encoding: 'utf-8' });
    }

    parseLine(line) {
        return JSON.parse(line);
    }
}
module.exports = JSONLReader;
