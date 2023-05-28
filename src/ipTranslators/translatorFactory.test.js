const TranslatorFactory = require('./translatorFactory');
const SqliteTranslator = require('./sqliteTranslator');
const IpStackTranslator = require('./ipStackTranslator');

describe('TranslatorFactory', () => {
  it('should create a SqliteTranslator when type is "sqlite"', () => {
    const type = 'sqlite';
    const translator = TranslatorFactory.createTranslator(type);

    expect(translator).toBeInstanceOf(SqliteTranslator);
  });

  it('should create an IpStackTranslator when type is "ip-stack"', () => {
    const type = 'ip-stack';
    const translator = TranslatorFactory.createTranslator(type);

    expect(translator).toBeInstanceOf(IpStackTranslator);
  });

  it('should throw an error when an unsupported type is provided', () => {
    const unsupportedType = 'invalid-type';

    expect(() => {
      TranslatorFactory.createTranslator(unsupportedType);
    }).toThrowError(`Unsupported translator type: ${unsupportedType}`);
  });
});