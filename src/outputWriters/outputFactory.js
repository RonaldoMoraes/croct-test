const path = require('path');
const JSONOutputWriter = require('./jsonOutputWriter');
const CSVOutputWriter = require('./csvOutputWriter');

class OutputFactory {
    static createOutputWriter(type) {
        const filePath = path.resolve(`data/output.${type}`);

        if (type === 'jsonl') {
            return new JSONOutputWriter(filePath);
        } if (type === 'csv') {
            return new CSVOutputWriter(filePath);
        }

        throw new Error(`Unsupported output type: ${type}`);
    }
}

module.exports = OutputFactory;
