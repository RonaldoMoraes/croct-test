const fs = require('fs');

class JSONOutputWriter {
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.outputStream = fs.createWriteStream(this.outputFilePath, { flags: 'a' });
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

        this.outputStream.write(`${JSON.stringify(filteredData)}\n`);
    }

    close() {
        this.outputStream.close();
    }
}

module.exports = JSONOutputWriter;
