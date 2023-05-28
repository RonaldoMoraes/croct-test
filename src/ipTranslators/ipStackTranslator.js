require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.IPSTACK_API_KEY;
const Translator = require('./translator');

class IpStackTranslator extends Translator {
    getLocation(ip) {
        const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
        return axios.get(url).then((response) => response.data);
    }
}

module.exports = IpStackTranslator;
