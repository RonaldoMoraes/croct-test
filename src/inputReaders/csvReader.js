const fs = require('fs');
const path = require('path');
// Could be using other delimiters too, but for now, just assume normal CSV
const csvDelimiter = ',';

class CSVReader {
    constructor() {
        this.rowCount = 0;
        this.headers;
        this.file = path.resolve('data/input.csv');
        this.inputStream = fs.createReadStream(this.file);
    }

    getReadStream() {
        return this.inputStream;
    }

    parseLine(line) {
        if (this.rowCount === 0) {
            this.headers = line.split(csvDelimiter);
            this.rowCount++;
            return;
        }

        return this.createLineObj(line);
    }

    createLineObj(line) {
        const row = {};
        const values = line.split(csvDelimiter);
        this.headers.forEach((header, index) => {
            row[header] = values[index];
        });
        return row;
    }
}

module.exports = CSVReader;
