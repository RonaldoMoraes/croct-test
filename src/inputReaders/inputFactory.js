const CSVReader = require('./csvReader');
const JSONLReader = require('./jsonlReader');

class InputFactory {
    static createInputReader(type) {
        if (type === 'csv') {
            return new CSVReader();
        } if (type === 'jsonl') {
            return new JSONLReader();
        }

        throw new Error(`Unsupported input type: ${type}`);
    }
}

module.exports = InputFactory;
