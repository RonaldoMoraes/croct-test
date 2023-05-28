const timeWindow = 30 * 60 * 1000; // 30 minutes

class LocationService {
    constructor(storage) {
      this.storage = storage;
    }
  
    async isWithinTimeWindow(clientId, ip, timestamp) {
        const keyPattern = `${clientId}-${ip}-*`;
        const keys = await this.storage.keys(keyPattern);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const storedEvent = await this.storage.find(key);
            const isWithin = this.compareTimeWindow(timestamp, storedEvent.timestamp, timeWindow);
            if (isWithin) {
                return true;
            }
        }
        return false;
    }

    compareTimeWindow(timestamp1, timestamp2, timeWindow) {
        return (timestamp1 - timestamp2) <= timeWindow;
    }

  }
  
  module.exports = LocationService;