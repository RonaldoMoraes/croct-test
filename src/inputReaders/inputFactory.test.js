const CSVReader = require('./csvReader');
const JSONLReader = require('./jsonlReader');
const InputFactory = require('./inputFactory');

describe('InputFactory', () => {
    describe('createInputReader', () => {
        it('should create a CSVReader instance when type is "csv"', () => {
            const reader = InputFactory.createInputReader('csv');

            expect(reader instanceof CSVReader).toBe(true);
        });

        it('should create a JSONLReader instance when type is "jsonl"', () => {
            const reader = InputFactory.createInputReader('jsonl');

            expect(reader instanceof JSONLReader).toBe(true);
        });

        it('should throw an error for unsupported input type', () => {
            expect(() => {
                InputFactory.createInputReader('txt');
            }).toThrowError('Unsupported input type: txt');
        });

        it('should throw an error when no input type is provided', () => {
            expect(() => {
                InputFactory.createInputReader();
            }).toThrowError('Unsupported input type: undefined');
        });

        it('should throw an error when input type is not a string', () => {
            expect(() => {
                InputFactory.createInputReader(123);
            }).toThrowError('Unsupported input type: 123');
        });
    });
});
