const fs = require('fs');
const filterData = require('../utils/filterData');

class JSONOutputWriter {
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.outputStream = fs.createWriteStream(this.outputFilePath, { flags: 'a' });
    }

    write(data) {
        const filteredData = filterData(data);

        this.outputStream.write(`${JSON.stringify(filteredData)}\n`);
    }

    close() {
        this.outputStream.close();
    }
}

module.exports = JSONOutputWriter;
