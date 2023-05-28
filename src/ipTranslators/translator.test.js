const Translator = require('./translator');

class MockTranslator extends Translator {
    async getLocation(ip) {
        return {
            country: 'United States',
            state: 'California',
            city: 'San Francisco',
            ip: ip,
            latitude: 37.7749,
            longitude: -122.4194
          };
    }
}

class MockTranslatorWithoutMethod extends Translator {
    // No getLocation method
}

describe('Translator', () => {
    let translator;

    beforeEach(() => {
        translator = new MockTranslator();
    });

    it('should throw an error when trying to instantiate the abstract class', () => {
        expect(() => new Translator()).toThrow('Abstract classes cannot be instantiated');
    });

    it('should throw an error when getLocation method is not implemented', async () => {
        translator = new MockTranslatorWithoutMethod();
        await expect(translator.getLocation('192.168.0.1')).rejects.toThrow('Not implemented');
    });

    describe('fetchLocation', () => {

        it('should call getLocation method', async () => {
            const getLocationSpy = jest.spyOn(translator, 'getLocation');
            await translator.fetchLocation('192.168.0.1');
            expect(getLocationSpy).toHaveBeenCalledWith('192.168.0.1');
            getLocationSpy.mockRestore();
        });

        it('should return the location when getLocation method is implemented', async () => {
            const expectedLocation = { city: 'New York', country: 'United States' };
            const getLocationSpy = jest.spyOn(translator, 'getLocation').mockResolvedValue(expectedLocation);
            const result = await translator.fetchLocation('192.168.0.1');
            expect(result).toEqual(expectedLocation);
            getLocationSpy.mockRestore();
        });
    });
});
