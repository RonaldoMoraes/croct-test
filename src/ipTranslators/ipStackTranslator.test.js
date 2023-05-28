const axios = require('axios');
const IpStackTranslator = require('./ipStackTranslator');

jest.mock('axios');

describe('IpStackTranslator', () => {
    let translator;

    beforeEach(() => {
        translator = new IpStackTranslator();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch location using IPStack API', async () => {
        const ip = '192.168.0.1';
        const locationData = { city: 'New York', country: 'United States' };
        axios.get.mockResolvedValue({ data: locationData });

        const result = await translator.getLocation(ip);

        expect(result).toEqual(locationData);
        expect(axios.get).toHaveBeenCalledWith(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
    });

    it('should handle error when fetching location', async () => {
        const ip = '192.168.0.1';
        const errorMessage = 'Failed to fetch location';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(translator.getLocation(ip)).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
    });
});
