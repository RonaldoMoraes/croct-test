const OutputFactory = require('./outputWriters/outputFactory');
const InputFactory = require('./inputReaders/inputFactory');
const TranslatorFactory = require('./ipTranslators/translatorFactory');

const argv = require('yargs')
    .usage('Usage: $0 --translator <translator> --input <input> --output <output>')
    .demandOption(['translator', 'input', 'output'], 'Please specify the type of data translator, input, and output.')
    .choices('translator', ['sqlite', 'ip-stack'])
    .choices('input', ['jsonl', 'csv'])
    .choices('output', ['jsonl', 'csv'])
    .parse(process.argv.slice(2));

const { input, translator, output } = argv;

const ipTranslator = TranslatorFactory.createTranslator(translator);
const inputReader = InputFactory.createInputReader(input);
const outputWriter = OutputFactory.createOutputWriter(output);

inputReader
    .readEvents()
    .then((events) => {
        const translationPromises = events.map((event) => ipTranslator
            .getLocation(event.ip)
            .then((location) => {
                const translatedEvent = { ...event, ...location };
                outputWriter.write(translatedEvent);
            })
            .catch((error) => {
                console.error(`Error translating IP for clientId ${event.id}:`, error, event);
            }));

        Promise.all(translationPromises)
            .then(() => {
                outputWriter.close();
            })
            .catch((error) => {
                console.error('Error writing translated events:', error);
                outputWriter.close();
            });
    })
    .catch((error) => {
        console.error('Error reading input file:', error);
    });
