const fs = require('fs');

class CSVOutputWriter {
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.outputStream = fs.createWriteStream(this.outputFilePath, { flags: 'a' });
        this.outputStream.write('id,timestamp,ip,latitude,longitude,country,region,city\n');
    }

    write(data) {
        const filteredData = {
            id: data.id ?? null,
            timestamp: data.timestamp ?? null,
            ip: data.ip ?? null,
            latitude: data.latitude ?? null,
            longitude: data.longitude ?? null,
            country: data.country ?? null,
            region: data.region ?? null,
            city: data.city ?? null,
        };

        this.outputStream.write(`${Object.values(filteredData)}\n`);
    }

    close() {
        this.outputStream.end();
    }
}

module.exports = CSVOutputWriter;
