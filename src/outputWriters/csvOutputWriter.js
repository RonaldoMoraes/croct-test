const fs = require('fs');
const filterData = require('../utils/filterData');

class CSVOutputWriter {
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.outputStream = fs.createWriteStream(this.outputFilePath, { flags: 'a' });
        this.outputStream.write('id,timestamp,ip,latitude,longitude,country,region,city\n');
    }

    write(data) {
        const filteredData = filterData(data);

        this.outputStream.write(`${Object.values(filteredData)}\n`);
    }

    close() {
        this.outputStream.end();
    }
}

module.exports = CSVOutputWriter;
