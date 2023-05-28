// const argv = require('yargs')
//     .usage('Usage: $0 --translator <translator> --input <input> --output <output>')
//     .demandOption(['translator', 'input', 'output'], 'Please specify the type of data translator, input, and output.')
//     .choices('translator', ['sqlite', 'ip-stack'])
//     .choices('input', ['jsonl', 'csv'])
//     .choices('output', ['jsonl', 'csv'])
//     .parse(process.argv.slice(2));

const OutputFactory = require('./outputWriters/outputFactory');
const InputFactory = require('./inputReaders/inputFactory');
const TranslatorFactory = require('./ipTranslators/translatorFactory');
// const RedisStorage = require('./repository/redisStorage');
const storage = require('./repository/redisStorage');
// const { input, translator, output } = argv;
const { input, translator, output } = {input: 'csv', translator: 'sqlite', output: 'jsonl'};

// const storage = new RedisStorage('location');
const ipTranslator = TranslatorFactory.createTranslator(translator);
const inputReader = InputFactory.createInputReader(input);
const outputWriter = OutputFactory.createOutputWriter(output);
const LocationServiceClass = require('./services/locationService');
const locationService = new LocationServiceClass(storage);

process.on('SIGINT', () => {
    outputWriter.close();
});


async function makeItHappen() {
    try {
      await storage.client.connect();
      inputReader.readEvents().then(async (events) => {
          for (const event of events) {
            await handleEvent(event);
          }
      });
    } catch (error) {
      console.error('Running custom error:', error);
    }
}

async function handleEvent(event) {
    const location = await ipTranslator.fetchLocation(event.ip);
    const translatedEvent = { ...event, ...location };
    const isWithinTimeWindow = await locationService.isWithinTimeWindow(translatedEvent.id, translatedEvent.ip, translatedEvent.timestamp, translatedEvent);
    if (isWithinTimeWindow) {
        return;
    }

    storage.store(`${translatedEvent.id}-${translatedEvent.ip}-${translatedEvent.timestamp}`, translatedEvent);
    outputWriter.write(translatedEvent);
}

makeItHappen();

