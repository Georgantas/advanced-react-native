
const twilio = require('twilio');

const accountSid = 'ACe11df31475c87751d32d671e291c290a';
const authToken = 'b5fa2e10199fd0da8a97beefce1b115e';

module.exports = new twilio.Twilio(accountSid, authToken);
