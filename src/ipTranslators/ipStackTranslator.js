const axios = require('axios');

const apiKey = '92755ec25f5e023bcc95cda621e41ace'; // Replace with your IPStack API key

class IpStackTranslator {
    getLocation(ip) {
        const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
        return axios.get(url).then((response) => response.data);
    }
}

module.exports = IpStackTranslator;
