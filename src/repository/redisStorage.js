const redis = require('redis');
require('dotenv').config();

class RedisStorage {
    constructor() {
        this.client = redis.createClient({
            url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
        });
        this.client.on('connect', (err)=>{
            if(err) throw err;
            else console.log('Redis Connected..!');
        });
        this.client.on('error', (err) => {
            console.log('Redis error: ', err);
        });
        process.on('SIGINT', () => {
            this.client.quit();
        });
    }

    async find(key) {
        const result = await this.client.get(key);
        return result ? JSON.parse(result) : {};
    }

    async store(key, jsonContent, time = 3600) {
        await this.client.set(key, JSON.stringify(jsonContent));
    }

    async keys(keyPattern) {
        return await this.client.keys(keyPattern);
    }
}

module.exports = new RedisStorage();
