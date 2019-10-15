const authToken = new Buffer(process.env.FEEDS_API_KEY).toString("base64");

module.exports = authToken;