const fs = require('fs');
const path = require('path');
const CSVReader = require('./csvReader');

describe('CSVReader', () => {
  let reader;

  beforeEach(() => {
    reader = new CSVReader();
  });

  describe('getReadStream', () => {
    it('should return a readable stream', () => {
      const stream = reader.getReadStream();
      expect(stream).toBeInstanceOf(fs.ReadStream);
    });

    it('should read the correct file', () => {
      const stream = reader.getReadStream();
      expect(stream.path).toEqual(path.resolve('data/input.csv'));
    });
  });

  describe('parseLine', () => {
    it('should set headers and increment rowCount when rowCount is 0', () => {
      const line = 'header1,header2,header3';
      reader.parseLine(line);
      expect(reader.headers).toEqual(['header1', 'header2', 'header3']);
      expect(reader.rowCount).toBe(1);
    });

    it('should return undefined when rowCount is 0', () => {
      const line = 'header1,header2,header3';
      const result = reader.parseLine(line);
      expect(result).toBeUndefined();
    });

    it('should create line object when rowCount is not 0', () => {
      reader.headers = ['header1', 'header2', 'header3'];
      reader.rowCount = 1;
      const line = 'value1,value2,value3';
      const expectedObj = {
        header1: 'value1',
        header2: 'value2',
        header3: 'value3',
      };
      const result = reader.parseLine(line);
      expect(result).toEqual(expectedObj);
    });
  });

  describe('createLineObj', () => {
    it('should create an object with correct properties and values', () => {
      reader.headers = ['header1', 'header2', 'header3'];
      const line = 'value1,value2,value3';
      const expectedObj = {
        header1: 'value1',
        header2: 'value2',
        header3: 'value3',
      };
      const result = reader.createLineObj(line);
      expect(result).toEqual(expectedObj);
    });
  });
});