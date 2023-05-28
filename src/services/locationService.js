class LocationService {
    constructor(storage) {
      this.storage = storage;
    }
  
    async isWithinTimeWindow(clientId, ip, timestamp) {
        const keyPattern = `${clientId}-${ip}-*`;
        const keys = await this.storage.keys(keyPattern);
        let existsWithinTimeWindow = false;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const storedEvent = await this.storage.find(key);
            if ((timestamp - storedEvent.timestamp) <= 30 * 60 * 1000) {
                existsWithinTimeWindow = true;
                continue;
            }
        }
        return existsWithinTimeWindow;
    }

  }
  
  module.exports = LocationService;