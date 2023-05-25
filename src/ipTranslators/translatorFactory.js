const SqliteTranslator = require('./sqliteTranslator');
const IpStackTranslator = require('./ipStackTranslator');

class TranslatorFactory {
    static createTranslator(type) {
        if (type === 'sqlite') {
            return new SqliteTranslator();
        } if (type === 'ip-stack') {
            return new IpStackTranslator();
        }

        throw new Error(`Unsupported translator type: ${type}`);
    }
}

module.exports = TranslatorFactory;
