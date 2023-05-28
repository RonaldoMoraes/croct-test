const LocationService = require('./locationService');

describe('LocationService', () => {
    let storage;
    let locationService;
    
    beforeEach(() => {
        storage = {
            keys: jest.fn(),
            find: jest.fn(),
        };
        locationService = new LocationService(storage);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return true if the timestamp is within the time window', async () => {
        const clientId = 'client1';
        const ip = '192.168.0.1';
        const timestamp = Date.now();
        
        const storedEvent = {
            timestamp: timestamp - 29 * 60 * 1000,
        };
        
        storage.keys.mockResolvedValue([`${clientId}-${ip}-1`]);
        storage.find.mockResolvedValue(storedEvent);
        
        const result = await locationService.isWithinTimeWindow(clientId, ip, timestamp);
        
        expect(storage.keys).toHaveBeenCalledWith(`${clientId}-${ip}-*`);
        expect(storage.find).toHaveBeenCalledWith(`${clientId}-${ip}-1`);
        expect(result).toBe(true);
    });
    
    it('should return false if the timestamp is outside the time window', async () => {
        const clientId = 'client1';
        const ip = '192.168.0.1';
        const timestamp = Date.now();
        const storedEvent = {
            timestamp: timestamp - 31 * 60 * 1000,
        };
        
        storage.keys.mockResolvedValue([`${clientId}-${ip}-1`]);
        storage.find.mockResolvedValue(storedEvent);
        
        const result = await locationService.isWithinTimeWindow(clientId, ip, timestamp);
        
        expect(storage.keys).toHaveBeenCalledWith(`${clientId}-${ip}-*`);
        expect(storage.find).toHaveBeenCalledWith(`${clientId}-${ip}-1`);
        expect(result).toBe(false);
    });
    
    it('should return false if no matching keys are found', async () => {
        const clientId = 'client1';
        const ip = '192.168.0.1';
        const timestamp = Date.now();
        
        storage.keys.mockResolvedValue([]);
        
        const result = await locationService.isWithinTimeWindow(clientId, ip, timestamp);
        
        expect(storage.keys).toHaveBeenCalledWith(`${clientId}-${ip}-*`);
        expect(storage.find).not.toHaveBeenCalled();
        expect(result).toBe(false);
    });
    
    it('should return false if the stored event is missing the timestamp property', async () => {
        const clientId = 'client1';
        const ip = '192.168.0.1';
        const timestamp = Date.now();
        
        const storedEvent = {};
        
        storage.keys.mockResolvedValue([`${clientId}-${ip}-1`]);
        storage.find.mockResolvedValue(storedEvent);
        
        const result = await locationService.isWithinTimeWindow(clientId, ip, timestamp);
        
        expect(storage.keys).toHaveBeenCalledWith(`${clientId}-${ip}-*`);
        expect(storage.find).toHaveBeenCalledWith(`${clientId}-${ip}-1`);
        expect(result).toBe(false);
    });
});