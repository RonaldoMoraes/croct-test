require('dotenv').config();
const readline = require('readline');
const OutputFactory = require('./outputWriters/outputFactory');
const InputFactory = require('./inputReaders/inputFactory');
const TranslatorFactory = require('./ipTranslators/translatorFactory');
const storage = require('./repository/redisStorage');

const { input, translator, output } = {
    input: process.env.INPUT_TYPE || 'csv',
    translator: process.env.TRANSLATOR_TYPE || 'sqlite',
    output: process.env.OUTPUT_TYPE || 'jsonl',
};

const ipTranslator = TranslatorFactory.createTranslator(translator);
const inputReader = InputFactory.createInputReader(input);
const outputWriter = OutputFactory.createOutputWriter(output);
const LocationServiceClass = require('./services/locationService');

const locationService = new LocationServiceClass(storage);

process.on('SIGINT', () => {
    outputWriter.close();
});

async function handleEvent(event, outputStream) {
    try {
        const location = await ipTranslator.fetchLocation(event.ip);
        const translatedEvent = { ...event, ...location };
        const isWithinTimeWindow = await locationService.isWithinTimeWindow(
            translatedEvent.id,
            translatedEvent.ip,
            translatedEvent.timestamp,
        );

        if (isWithinTimeWindow) return;

        storage.store(
            `${translatedEvent.id}-${translatedEvent.ip}-${translatedEvent.timestamp}`,
            translatedEvent,
        );
        outputStream.write(translatedEvent);
    } catch (error) {
        console.error('Error handling event:', error);
    }
}

async function processLines(rl) {
    for await (const line of rl) {
        const processedLine = inputReader.parseLine(line);
        if (processedLine !== undefined) await handleEvent(processedLine, outputWriter);
    }

    outputWriter.close();
    console.info('File processing completed.');
}

async function makeItHappen() {
    try {
        await storage.client.connect();
        const inputStream = inputReader.getReadStream();

        const rl = readline.createInterface({
            input: inputStream,
            crlfDelay: Infinity,
        });

        processLines(rl)
            .catch((error) => {
                console.error('Error processing lines:', error);
            });
    } catch (error) {
        console.error('Running custom error:', error);
    }
}

makeItHappen();
