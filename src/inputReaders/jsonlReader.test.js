const path = require('path');
const { Readable } = require('stream');
const JSONLReader = require('./jsonlReader');

describe('JSONLReader', () => {
    const filePath = 'data/input.jsonl';

    beforeEach(() => {
        reader = new JSONLReader();
    });

    describe('getReadStream', () => {
        it('should create a readable stream for the JSONL file', () => {
            const stream = reader.getReadStream();

            expect(stream instanceof Readable).toBe(true);
            expect(stream.path).toBe(path.resolve(filePath));
        });

        it('should read the correct file', () => {
            const stream = reader.getReadStream();
            expect(stream.path).toEqual(path.resolve('data/input.jsonl'));
        });
    });

    describe('parseLine', () => {
        it('should parse a line of JSONL into an object', () => {
            const line = '{"id": "95cdb0f2-9487-5bfd-aeda-bac27dd406fa", "ip": "51.215.112.211", "timestamp": 1684203697126}';
            const result = reader.parseLine(line);

            expect(result).toEqual({ id: '95cdb0f2-9487-5bfd-aeda-bac27dd406fa', ip: '51.215.112.211', timestamp: 1684203697126 });
        });

        it('should throw an error if the line is not valid JSON', () => {
            const line = 'Invalid JSON';

            expect(() => {
                reader.parseLine(line);
            }).toThrowError(SyntaxError);
        });
    });
});
