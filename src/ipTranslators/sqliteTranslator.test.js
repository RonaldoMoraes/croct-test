const SQLiteTranslator = require('./sqliteTranslator');

describe('SQLiteTranslator', () => {
    let translator;
    
    beforeEach(() => {
        translator = new SQLiteTranslator();
    });
    
    afterEach(() => {
        translator.db.close();
    });
    
    it('should return the location data when IP exists in the database', async () => {
        const expectedLocation = {
            country: 'United States',
            state: 'Ohio',
            city: 'Columbus',
            ip: '30.46.245.122',
            latitude: 39.97883,
            longitude: -82.89573
        };

        const location = await translator.fetchLocation(expectedLocation.ip);

        expect(location).toEqual(expectedLocation);
    });
    
    it('should return an empty object when IP does not exist in the database', async () => {
        const ip = '10.0.0.1';
        const expectedLocation = {};
        
        const location = await translator.fetchLocation(ip);
        
        expect(location).toEqual(expectedLocation);
    });
 
});